export const APP_CONFIG = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  naverMapClientId: process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || "",
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "https://wedding.zerohertz.xyz",
} as const;
