import { GoogleGenAI, Modality } from "@google/genai";
import { THUMBNAIL_SYSTEM_PROMPT } from "./systemPrompt";

const TOOL_STYLE_MAP: Record<string, string> = {
  cinematic:
    "cinematic dramatic lighting, film-quality color grading, moody atmosphere, professional photography composition, epic widescreen feel",
  bold:
    "bold vibrant oversaturated colors, extreme high contrast, large striking visual elements, attention-grabbing graphic design, explosive energy",
  minimal:
    "minimal clean design, generous white space, single strong focal point, elegant simple layout, sophisticated understated aesthetic",
  text:
    "typography-focused layout, large impactful headline text, strong font hierarchy, text as the primary visual element, highly readable",
  custom:
    "artistic style that closely matches and references the uploaded image provided",
};

function hasKorean(text: string): boolean {
  return /[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F]/.test(text);
}

async function translateToEnglish(text: string): Promise<string> {
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ko|en`;
  const res = await fetch(url);
  if (!res.ok) return text;
  const data = await res.json() as { responseData?: { translatedText?: string } };
  return data.responseData?.translatedText ?? text;
}

export interface GenerateThumbnailInput {
  prompt: string;
  tool?: string | null;
  referenceImages?: { base64: string; mimeType: string }[];
}

export interface GenerateThumbnailResult {
  imageBase64: string;
  mimeType: string;
}

export async function generateThumbnail({
  prompt,
  tool,
  referenceImages,
}: GenerateThumbnailInput): Promise<GenerateThumbnailResult> {
  const englishPrompt = hasKorean(prompt)
    ? await translateToEnglish(prompt)
    : prompt;

  const styleHint = tool ? (TOOL_STYLE_MAP[tool] ?? "") : "";

  const fullPrompt = [englishPrompt, styleHint]
    .filter(Boolean)
    .join(", ");

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const parts: { text?: string; inlineData?: { mimeType: string; data: string } }[] = [
    { text: fullPrompt },
    ...(referenceImages ?? []).map(img => ({
      inlineData: { mimeType: img.mimeType, data: img.base64 },
    })),
  ];

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [{ parts }],
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
      systemInstruction: THUMBNAIL_SYSTEM_PROMPT,
      imageConfig: {
        imageSize: '2K',
        aspectRatio: '16:9',
      },
      tools: [
        {
          googleSearch: {
            searchTypes: {
              imageSearch: {},
            },
          },
        },
      ],
    },
  });

  const candidates = response.candidates;
  if (!candidates || candidates.length === 0) {
    throw new Error("Gemini returned no candidates");
  }

  for (const part of candidates[0].content?.parts ?? []) {
    if (part.inlineData?.data) {
      return {
        imageBase64: part.inlineData.data,
        mimeType: part.inlineData.mimeType ?? "image/png",
      };
    }
  }

  throw new Error("Gemini returned no image data");
}
