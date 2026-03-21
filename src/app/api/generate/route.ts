import { createClient } from "@/lib/supabase/server";
import { generateThumbnail } from "@/lib/gemini";

export async function POST(request: Request) {
  const supabase = await createClient();

  // 인증 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 크레딧 확인
  const { data: profile } = await supabase
    .from("users")
    .select("credits")
    .eq("id", user.id)
    .single();

  if (!profile || profile.credits < 1) {
    return Response.json({ error: "Insufficient credits" }, { status: 402 });
  }

  const { prompt, tool, referenceImages } = await request.json();

  if (!prompt?.trim() && (!referenceImages || referenceImages.length === 0)) {
    return Response.json({ error: "Prompt or image is required" }, { status: 400 });
  }

  // DB에 generating 상태로 레코드 INSERT
  const { data: thumbnail, error: insertError } = await supabase
    .from("thumbnails")
    .insert({
      user_id: user.id,
      prompt: prompt.trim(),
      tool: tool ?? null,
      status: "generating",
    })
    .select()
    .single();

  if (insertError || !thumbnail) {
    return Response.json({ error: "Failed to create record" }, { status: 500 });
  }

  const thumbnailId = thumbnail.id;

  try {
    // 참조 이미지 data URL 배열 → { base64, mimeType }[] 변환
    const parsedRefImages: { base64: string; mimeType: string }[] = [];
    for (const dataUrl of (referenceImages ?? []) as string[]) {
      const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        parsedRefImages.push({ mimeType: match[1], base64: match[2] });
      }
    }

    // Gemini로 이미지 생성
    const { imageBase64, mimeType } = await generateThumbnail({
      prompt: prompt ?? "",
      tool,
      referenceImages: parsedRefImages,
    });

    // base64 → Buffer → Uint8Array로 변환
    const imageBuffer = Buffer.from(imageBase64, "base64");

    // 생성된 썸네일을 storage에 업로드
    const ext = mimeType.split("/")[1] ?? "png";
    const storagePath = `${user.id}/${thumbnailId}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("thumbnails")
      .upload(storagePath, imageBuffer, {
        contentType: mimeType,
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Storage upload failed: ${uploadError.message}`);
    }

    // 참조 이미지들을 storage에 업로드 (첫 번째만 reference_image_path에 저장)
    let refStoragePath: string | null = null;
    for (let i = 0; i < parsedRefImages.length; i++) {
      const img = parsedRefImages[i];
      const refExt = img.mimeType.split("/")[1] ?? "png";
      const path = `${user.id}/${thumbnailId}_ref${i}.${refExt}`;

      await supabase.storage
        .from("reference-images")
        .upload(path, Buffer.from(img.base64, "base64"), {
          contentType: img.mimeType,
          upsert: false,
        });

      if (i === 0) refStoragePath = path;
    }

    // DB 레코드 completed 로 업데이트
    await supabase
      .from("thumbnails")
      .update({
        status: "completed",
        image_path: storagePath,
        reference_image_path: refStoragePath,
      })
      .eq("id", thumbnailId);

    // 크레딧 차감
    await supabase
      .from("users")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);

    // 클라이언트에 반환할 Signed URL 생성 (1시간 유효)
    const { data: signedUrlData } = await supabase.storage
      .from("thumbnails")
      .createSignedUrl(storagePath, 3600);

    return Response.json({
      thumbnail: {
        id: thumbnailId,
        prompt,
        tool,
        imageUrl: signedUrlData?.signedUrl ?? null,
        imagePath: storagePath,
        createdAt: thumbnail.created_at,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";

    // 실패 시 DB 상태 업데이트
    await supabase
      .from("thumbnails")
      .update({ status: "failed", error_message: message })
      .eq("id", thumbnailId);

    return Response.json({ error: message }, { status: 500 });
  }
}
