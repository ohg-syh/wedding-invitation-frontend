import { useEffect, useRef } from "react";

import { openNavigation } from "@/utils/navigation";

import weddingData from "@/payloads/wedding";

interface NaverMap {
  maps: {
    LatLng: new (lat: number, lng: number) => void;
    Map: new (element: HTMLElement, options: unknown) => void;
    Marker: new (options: unknown) => void;
    Position: {
      TOP_RIGHT: number;
    };
  };
}

declare global {
  interface Window {
    naver: NaverMap;
  }
}

// 지하철 노선 색상 매핑
const SUBWAY_COLORS: Record<string, string> = {
  "1호선": "#0052A4",
  "2호선": "#00A84D",
  "3호선": "#EF7C1C",
  "4호선": "#00A5DE",
  "5호선": "#996CAC",
  "6호선": "#CD7C2F",
  "7호선": "#747F00",
  "8호선": "#E6186C",
  "9호선": "#BDB092",
  수인분당선: "#FABE00",
  신분당선: "#D31145",
  경의중앙선: "#77C4A3",
  공항철도: "#0090D2",
  경춘선: "#0C8E72",
  우이신설선: "#B0CE18",
  서해선: "#8FC31F",
  김포골드라인: "#A17E00",
  신림선: "#6789CA",
};

// 버스 색상 매핑 (서울시 기준)
const getBusColor = (busNumber: string): string => {
  const num = parseInt(busNumber);

  if (isNaN(num)) return "#666"; // 기본 색상

  // 간선버스 (파란색) - 100~499번대
  if ((num >= 100 && num < 200) || (num >= 400 && num < 500)) {
    return "#3D5AFE";
  }
  // 지선버스 (초록색) - 10~99번대, 2000~2999번대
  if ((num >= 10 && num < 100) || (num >= 2000 && num < 3000)) {
    return "#4CAF50";
  }
  // 순환버스 (노란색) - 01~09번대
  if (num >= 1 && num < 10) {
    return "#FBC02D";
  }
  // 광역버스 (빨간색) - 1000~1999번대, 9000~9999번대
  if ((num >= 1000 && num < 2000) || (num >= 9000 && num < 10000)) {
    return "#F44336";
  }
  // 공항버스 - 6000~6999번대
  if (num >= 6000 && num < 7000) {
    return "#8BC34A";
  }

  return "#666"; // 기본 회색
};

const formatSubwayLine = (text: string) => {
  const subwayLinePattern =
    /([^\s]+호선|수인분당선|신분당선|경의중앙선|공항철도|경춘선|우이신설선|서해선|김포골드라인|신림선)/g;
  const lines: string[] = [];
  let match;

  while ((match = subwayLinePattern.exec(text)) !== null) {
    lines.push(match[1]);
  }

  const description = text
    .replace(subwayLinePattern, "")
    .replace(/^[,\s]+|[,\s]+$/g, "")
    .trim();

  return (
    <div className="subway-info">
      <div className="subway-badges">
        {lines.map((lineName, idx) => {
          const color = SUBWAY_COLORS[lineName] || "#666";
          return (
            <span key={idx} className="subway-badge" style={{ backgroundColor: color }}>
              {lineName}
            </span>
          );
        })}
      </div>
      {description && <div className="transport-description">{description}</div>}
    </div>
  );
};

const formatBusLine = (text: string) => {
  if (!text || text.trim() === "") return null;

  const busNumberPattern = /\d+/g;
  const busNumbers: string[] = [];
  let match;

  while ((match = busNumberPattern.exec(text)) !== null) {
    busNumbers.push(match[0]);
  }

  if (busNumbers.length === 0) {
    return <div className="transport-description">{text}</div>;
  }

  const description = text
    .replace(busNumberPattern, "")
    .replace(/[(),\s]+/g, " ")
    .trim();

  return (
    <div className="bus-info">
      <div className="bus-badges">
        {busNumbers.map((num, idx) => {
          const color = getBusColor(num);
          return (
            <span key={idx} className="bus-badge" style={{ backgroundColor: color }}>
              {num}
            </span>
          );
        })}
      </div>
      {description && <div className="transport-description">{description}</div>}
    </div>
  );
};

const LocationSection: React.FC = () => {
  const { ceremony, transportation } = weddingData;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && window.naver && window.naver.maps) {
      try {
        const location = new window.naver.maps.LatLng(ceremony.coords.lat, ceremony.coords.lng);

        const mapOptions = {
          center: location,
          zoom: 17,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
        };

        const map = new window.naver.maps.Map(mapRef.current, mapOptions);

        new window.naver.maps.Marker({
          position: location,
          map: map,
          title: ceremony.venue,
        });
      } catch {
        // 네이버 지도를 로드할 수 없습니다. API 키를 확인하세요.
      }
    }
  }, [ceremony.coords, ceremony.venue]);

  const handleNavigation = (type: "naver" | "tmap" | "kakao") => {
    openNavigation(type, ceremony.coords, ceremony.venue);
  };

  return (
    <section className="location-section">
      <div className="section-header">
        <h2 className="section-title">LOCATION</h2>
        <p className="section-subtitle">오시는 길</p>
      </div>

      <div className="venue-info">
        <h3 className="venue-name">
          {ceremony.venue}
          {ceremony.floor && `, ${ceremony.floor}`}
        </h3>
        <p className="venue-address">{ceremony.address}</p>
        {ceremony.tel && (
          <a href={`tel:${ceremony.tel}`} className="venue-tel">
            Tel. {ceremony.tel}
          </a>
        )}
      </div>

      <div className="map-container">
        <div ref={mapRef} id="map" style={{ width: "100%", height: "400px" }}></div>
      </div>

      <div className="navigation-buttons">
        <h4>내비게이션</h4>
        <p>원하시는 앱을 선택하시면 길안내가 시작됩니다.</p>
        <div className="nav-button-group">
          <button onClick={() => handleNavigation("naver")}>네이버지도</button>
          <button onClick={() => handleNavigation("tmap")}>티맵</button>
          <button onClick={() => handleNavigation("kakao")}>카카오내비</button>
        </div>
      </div>

      <div className="transportation-info">
        {transportation.subway && transportation.subway.length > 0 && (
          <div className="transport-item subway">
            <div className="transport-header">
              <div className="transport-icon">🚇</div>
              <h4>지하철</h4>
            </div>
            <div className="transport-content">
              {transportation.subway.map((line, index) => (
                <div key={index}>{formatSubwayLine(line)}</div>
              ))}
            </div>
          </div>
        )}

        {transportation.shuttle && (
          <div className="transport-item shuttle">
            <div className="transport-header">
              <div className="transport-icon">🚐</div>
              <h4>셔틀버스</h4>
            </div>
            <div className="transport-content">
              <p>{transportation.shuttle}</p>
            </div>
          </div>
        )}

        {transportation.bus && transportation.bus.length > 0 && (
          <div className="transport-item bus">
            <div className="transport-header">
              <div className="transport-icon">🚌</div>
              <h4>버스</h4>
            </div>
            <div className="transport-content">
              {transportation.bus.map((line, index) => (
                <div key={index}>{formatBusLine(line)}</div>
              ))}
            </div>
          </div>
        )}

        {transportation.parking && (
          <div className="transport-item parking">
            <div className="transport-header">
              <div className="transport-icon">🅿️</div>
              <h4>주차안내</h4>
            </div>
            <div className="transport-content">
              <p>{transportation.parking}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LocationSection;
