export interface WeddingData {
  // 신랑 신부 정보
  groom: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    phone?: string;
    fatherPhone?: string;
    motherPhone?: string;
  };
  bride: {
    name: string;
    fullName: string;
    father: string;
    mother: string;
    phone?: string;
    fatherPhone?: string;
    motherPhone?: string;
  };

  // 예식 정보
  ceremony: {
    date: string; // ISO 8601 format
    time: string;
    venue: string;
    address: string;
    floor?: string;
    tel?: string;
    coords: {
      lat: number;
      lng: number;
    };
  };

  // 교통 정보
  transportation: {
    subway?: string[];
    bus?: string[];
    shuttle?: string;
    parking?: string;
  };

  // 갤러리 이미지
  gallery: {
    main: string; // 메인 커버 이미지
    images: string[]; // 갤러리 이미지들
  };

  // 스플래시 스크린 이미지
  splash: {
    images: string[]; // 스플래시 배경 이미지들
  };

  // 예식 안내문 (하객 안내 인포그래픽)
  guide?: {
    image: string;
  };

  // 계좌 정보
  accounts: {
    groom: Array<{
      name: string;
      bank: string;
      account: string;
      kakaopay?: string;
    }>;
    bride: Array<{
      name: string;
      bank: string;
      account: string;
      kakaopay?: string;
    }>;
  };

  // 메시지
  messages: {
    greeting: string; // 초대 메시지
    notice?: string; // 공지사항 (포토부스 등)
  };
}

const weddingData: WeddingData = {
  groom: {
    name: "현근",
    fullName: "오현근",
    father: "오영록",
    mother: "김화신",
    phone: "010-7410-2470",
    fatherPhone: "010-5858-2670",
    motherPhone: "010-4622-1009",
  },
  bride: {
    name: "윤희",
    fullName: "서윤희",
    father: "서용택",
    mother: "김순이",
    phone: "010-2659-9615",
    fatherPhone: "010-7650-1949",
    motherPhone: "010-9019-9615",
  },
  ceremony: {
    date: "2026-10-25T11:00:00",
    time: "일요일 오전 11시",
    venue: "상록아트홀",
    address: "서울특별시 강남구 언주로 508 (역삼동 701번지)",
    floor: "B1F 그랜드볼룸홀",
    tel: "02-564-5757",
    coords: {
      lat: 37.5038913,
      lng: 127.0429552,
    },
  },
  transportation: {
    subway: ["2호선, 수인분당선 선릉역 5번 출구 도보 5분"],
    bus: [
      "KT 강남지사 하차",
      "141(도봉산), 242(중랑, 신내역), 361(여의도)",
      "",
      "한국기술센터, 상록회관 하차",
      "146(상계동), 341(하남), 360(송파), 740(덕은동)",
    ],
    shuttle: "선릉역 5번 출구에서 운행",
    parking: "동시 950대 주차 가능",
  },
  gallery: {
    main: "/images/cover/main.webp",
    images: [
      "/images/gallery/01.webp",
      "/images/gallery/02.webp",
      "/images/gallery/03.webp",
      "/images/gallery/04.webp",
      "/images/gallery/05.webp",
      "/images/gallery/06.webp",
      "/images/gallery/07.webp",
      "/images/gallery/08.webp",
      "/images/gallery/09.webp",
      "/images/gallery/10.webp",
      "/images/gallery/11.webp",
      "/images/gallery/12.webp",
      "/images/gallery/13.webp",
      "/images/gallery/14.webp",
      "/images/gallery/15.webp",
      "/images/gallery/16.webp",
      "/images/gallery/17.webp",
      "/images/gallery/18.webp",
      "/images/gallery/19.webp",
      "/images/gallery/20.webp",
      "/images/gallery/21.webp",
      "/images/gallery/22.webp",
      "/images/gallery/23.webp",
      "/images/gallery/24.webp",
      "/images/gallery/25.webp",
      "/images/gallery/26.webp",
      "/images/gallery/27.webp",
      "/images/gallery/28.webp",
      "/images/gallery/29.webp",
      "/images/gallery/30.webp",
      "/images/gallery/31.webp",
      "/images/gallery/32.webp",
      "/images/gallery/33.webp",
      "/images/gallery/34.webp",
    ],
  },
  splash: {
    images: ["/images/splash/01.webp", "/images/splash/02.webp", "/images/splash/03.webp"],
  },
  guide: {
    image: "/images/info/guest-info.png",
  },
  accounts: {
    groom: [
      {
        name: "오현근",
        bank: "국민",
        account: "97410247068",
        kakaopay: "https://qr.kakaopay.com/Ej8w84MvE",
      },
      {
        name: "오영록 (아버지)",
        bank: "신한",
        account: "110-007-242246",
        kakaopay: "",
      },
      {
        name: "김화신 (어머니)",
        bank: "농협",
        account: "175511-56-042740",
        kakaopay: "",
      },
    ],
    bride: [
      {
        name: "서윤희",
        bank: "신한",
        account: "110-433-939907",
        kakaopay: "",
      },
      {
        name: "서용택 (아버지)",
        bank: "기업",
        account: "080-011-329-03-010",
        kakaopay: "",
      },
      {
        name: "김순이 (어머니)",
        bank: "국민",
        account: "843-21-0291-171",
        kakaopay: "",
      },
    ],
  },
  messages: {
    greeting: `저희 두 사람의 작은 만남이
사랑의 결실을 이루어
소중한 결혼식을 올리게 되었습니다.

평생 서로 귀하게 여기며
첫 마음 그대로 존중하고 배려하며 살겠습니다.

오로지 믿음과 사랑을 약속하는 날
오셔서 축복해 주시면 더없는 기쁨으로
간직하겠습니다.`,
    notice: "",
  },
};

export default weddingData;
