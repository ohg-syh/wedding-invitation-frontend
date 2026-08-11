interface Coordinates {
  lat: number;
  lng: number;
}

export const openNavigation = (type: "naver" | "tmap" | "kakao", coords: Coordinates, venueName: string): void => {
  const appUrls = {
    naver: `nmap://place?lat=${coords.lat}&lng=${coords.lng}&name=${encodeURIComponent(venueName)}`,
    tmap: `tmap://route?goalname=${encodeURIComponent(venueName)}&goalx=${coords.lng}&goaly=${coords.lat}`,
    kakao: `kakaomap://look?p=${coords.lat},${coords.lng}`,
  };

  const webUrls = {
    naver: `https://map.naver.com/v5/search/${encodeURIComponent(venueName)}?c=${coords.lng},${coords.lat},15,0,0,0,dh`,
    tmap: `https://tmap.life/route?goalname=${encodeURIComponent(venueName)}&goalx=${coords.lng}&goaly=${coords.lat}`,
    kakao: `https://map.kakao.com/link/map/${encodeURIComponent(venueName)},${coords.lat},${coords.lng}`,
  };

  const appUrl = appUrls[type];
  const webUrl = webUrls[type];

  const timeout = setTimeout(() => {
    window.open(webUrl, "_blank");
  }, 1500);

  window.location.href = appUrl;

  window.addEventListener(
    "blur",
    () => {
      clearTimeout(timeout);
    },
    { once: true },
  );
};
