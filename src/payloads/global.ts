import { NextSeoProps } from "next-seo";

interface GlobalConfig {
  headTitle: string;
  favicon: string;
  seo: NextSeoProps;
  analytics?: {
    google?: string;
    naver?: string;
  };
}

const title = "현근 ♥️ 윤희 결혼합니다.";
const description = "2026년 10월 25일 일요일 오전 11시 | 서울특별시 강남구 언주로 508";

const global: GlobalConfig = {
  favicon: "icons/favicon-512.png",
  headTitle: title,
  analytics: {
    google: "G-0N790LXTXC",
  },
  seo: {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "/images/cover/main.webp",
          alt: "Wedding Invitation",
        },
      ],
      type: "website",
    },
  },
};

export default global;
