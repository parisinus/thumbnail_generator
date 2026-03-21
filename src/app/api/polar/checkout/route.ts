import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const PRODUCT_IDS: Record<string, string> = {
  pro: process.env.POLAR_PRO_PRODUCT_ID ?? "",
  ultra: process.env.POLAR_ULTRA_PRODUCT_ID ?? "",
}

const POLAR_API_BASE = "https://sandbox-api.polar.sh"

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { planId } = await request.json()
  const productId = PRODUCT_IDS[planId]

  if (!productId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/checkouts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        products: [productId],
        external_customer_id: user.id,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
      }),
    })

    const data = await res.json()
    console.log("Polar response status:", res.status, "data:", JSON.stringify(data).slice(0, 200))

    if (!res.ok) {
      return NextResponse.json({ error: JSON.stringify(data) }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    const cause = (err instanceof Error && (err as any).cause) ? String((err as any).cause) : "no cause"
    console.error("Polar fetch error:", message, "| cause:", cause)
    return NextResponse.json({ error: `${message} | cause: ${cause}` }, { status: 500 })
  }
}
