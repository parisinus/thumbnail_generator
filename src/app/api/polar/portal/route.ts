import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const POLAR_API_BASE = "https://sandbox-api.polar.sh"

export async function POST() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from("users")
    .select("polar_customer_id")
    .eq("id", user.id)
    .single()

  if (!profile?.polar_customer_id) {
    return NextResponse.json({ error: "No subscription found" }, { status: 404 })
  }

  try {
    const res = await fetch(`${POLAR_API_BASE}/v1/customer-sessions`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.POLAR_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ customer_id: profile.polar_customer_id }),
    })
    const data = await res.json()
    if (!res.ok) {
      return NextResponse.json({ error: JSON.stringify(data) }, { status: 500 })
    }
    return NextResponse.json({ url: data.customer_portal_url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
