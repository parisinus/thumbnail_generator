import { NextResponse } from "next/server"
import { createHmac } from "crypto"
import { createServiceRoleClient } from "@/lib/supabase/service"

export const dynamic = "force-dynamic"

const CREDITS: Record<string, number> = { pro: 100, ultra: 300 }

function getTier(productId: string): string {
  if (productId === process.env.POLAR_PRO_PRODUCT_ID) return "pro"
  if (productId === process.env.POLAR_ULTRA_PRODUCT_ID) return "ultra"
  return "unknown"
}

async function verify(req: Request, body: string): Promise<boolean> {
  const secret = process.env.POLAR_WEBHOOK_SECRET ?? ""
  if (!secret) return false
  const msgId = req.headers.get("webhook-id") ?? ""
  const msgTs = req.headers.get("webhook-timestamp") ?? ""
  const msgSig = req.headers.get("webhook-signature") ?? ""
  if (!msgId || !msgTs || !msgSig) return false
  // whsec_ prefix: base64-decode the rest; otherwise use raw secret bytes
  const rawSecret = secret.startsWith("whsec_")
    ? Buffer.from(secret.slice(6), "base64")
    : Buffer.from(secret)
  const toSign = `${msgId}.${msgTs}.${body}`
  const computed = createHmac("sha256", rawSecret).update(toSign).digest("base64")
  return msgSig.split(" ").some((s) => s.split(",")[1] === computed)
}

export async function POST(req: Request) {
  const body = await req.text()

  if (!(await verify(req, body))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 })
  }

  const event = JSON.parse(body)
  const supabase = createServiceRoleClient()
  const type: string = event.type
  const data = event.data

  console.log("Polar webhook:", type)

  if (type === "subscription.created" || type === "subscription.active") {
    const userId: string = data.customer?.external_id ?? ""
    const productId: string = data.product?.id ?? ""
    const tier = getTier(productId)
    const creditsToAdd = CREDITS[tier] ?? 0

    if (userId && creditsToAdd > 0) {
      await supabase.rpc("increment_credits", { user_id: userId, amount: creditsToAdd })
      await supabase
        .from("users")
        .update({
          polar_customer_id: data.customer?.id,
          subscription_tier: tier,
          subscription_status: "active",
        })
        .eq("id", userId)
      console.log(`Added ${creditsToAdd} credits to user ${userId} (${tier})`)
    }
  } else if (type === "subscription.updated") {
    const userId: string = data.customer?.external_id ?? ""
    if (userId) {
      const status = data.status === "active" ? "active" : data.status === "canceled" ? "canceled" : null
      if (status) {
        // Check if tier changed
        const newProductId: string = data.product?.id ?? ""
        const newTier = getTier(newProductId)
        const { data: currentUser } = await supabase
          .from("users")
          .select("subscription_tier")
          .eq("id", userId)
          .single()

        const tierChanged = newTier !== "unknown" && currentUser?.subscription_tier !== newTier

        const updates: Record<string, string> = { subscription_status: status }
        if (tierChanged) updates.subscription_tier = newTier

        await supabase.from("users").update(updates).eq("id", userId)

        if (tierChanged && status === "active") {
          const creditsToAdd = CREDITS[newTier] ?? 0
          if (creditsToAdd > 0) {
            await supabase.rpc("increment_credits", { user_id: userId, amount: creditsToAdd })
            console.log(`Tier changed to ${newTier}, added ${creditsToAdd} credits for user ${userId}`)
          }
        } else {
          console.log(`Subscription updated to ${status} for user ${userId}`)
        }
      }
    }
  } else if (type === "subscription.canceled" || type === "subscription.revoked") {
    const userId: string = data.customer?.external_id ?? ""
    if (userId) {
      await supabase
        .from("users")
        .update({ subscription_status: "canceled" })
        .eq("id", userId)
      console.log(`Subscription canceled for user ${userId}`)
    }
  } else if (type === "order.paid") {
    const userId: string = data.customer?.external_id ?? ""
    if (userId) {
      await supabase.from("payments").insert({
        user_id: userId,
        polar_order_id: data.id,
        amount: data.net_amount,
        currency: data.currency ?? "usd",
        status: "paid",
      })
      console.log(`Payment recorded for user ${userId}, order ${data.id}`)
    }
  }

  return NextResponse.json({ received: true })
}
