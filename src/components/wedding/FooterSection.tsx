import { useEffect, useRef } from "react";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendCustom: (options: object) => void;
      };
    };
  }
}

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

const FooterSection: React.FC = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (!KAKAO_JS_KEY || initialized.current) return;
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
      initialized.current = true;
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) return;
    window.Kakao.Share.sendCustom({ templateId: 130889 });
  };

  return (
    <footer className="footer-section">
      <p className="footer-thanks">감사합니다</p>
      {KAKAO_JS_KEY && (
        <button className="btn-kakao-share" onClick={handleKakaoShare}>
          <img src="/icons/kakao.svg" alt="KakaoTalk" className="kakao-icon" />
          카카오톡으로 초대장 보내기
        </button>
      )}
    </footer>
  );
};

export default FooterSection;
