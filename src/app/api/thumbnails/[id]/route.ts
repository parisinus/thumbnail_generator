import { createClient } from "@/lib/supabase/server"

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 본인 소유 확인
  const { data: thumbnail, error: fetchError } = await supabase
    .from("thumbnails")
    .select("id, user_id, image_path, reference_image_path")
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (fetchError || !thumbnail) {
    return Response.json({ error: "Not found" }, { status: 404 })
  }

  // Storage 파일 삭제
  if (thumbnail.image_path) {
    await supabase.storage.from("thumbnails").remove([thumbnail.image_path])
  }
  if (thumbnail.reference_image_path) {
    await supabase.storage.from("reference-images").remove([thumbnail.reference_image_path])
  }

  // DB 레코드 삭제
  await supabase.from("thumbnails").delete().eq("id", id)

  return Response.json({ success: true })
}
