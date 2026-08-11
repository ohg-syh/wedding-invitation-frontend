import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

import global from "@/payloads/global";

class DocumentImpl extends Document {
  render() {
    // Get language from the URL path or default to Korean
    const isEnglish = this.props?.__NEXT_DATA__?.page === "/" || this.props?.__NEXT_DATA__?.query?.lang === undefined;
    const lang = isEnglish ? "en-US" : "ko-KR";

    return (
      <Html lang={lang}>
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:image" content="/props/og.png" />
          <meta property="og:image:alt" content="Wedding Invitation Open Graph Image" />
          {/* Font Setup: https://fonts.google.com */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@200..900&family=Parisienne&family=Cormorant+Garamond:wght@300;400&family=Gowun+Dodum:wght@400&family=Bona+Nova+SC:wght@400;700&family=Crimson+Pro:wght@400;600&family=Great+Vibes&family=Playfair+Display:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
          {/* Google Analytics */}
          {global.analytics && global.analytics.google && (
            <Script
              strategy="beforeInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${global.analytics.google}`}
            />
          )}
          {/* Naver Analytics */}
          {global.analytics && global.analytics.naver && (
            <Script strategy="beforeInteractive" src="//wcs.naver.net/wcslog.js" type="text/javascript" />
          )}
          {/* Naver Map API */}
          <Script
            strategy="beforeInteractive"
            src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
            type="text/javascript"
          />
          {/* Kakao SDK */}
          <Script strategy="beforeInteractive" src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default DocumentImpl;
