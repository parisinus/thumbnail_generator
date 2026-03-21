import { Polar } from "@polar-sh/sdk"

// TODO: 배포 전 제거 — Node.js TLS 이슈 임시 우회 (개발 전용)
if (process.env.NODE_ENV === "development") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
}

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
  server: "sandbox", // 배포 시 이 줄 제거
})
