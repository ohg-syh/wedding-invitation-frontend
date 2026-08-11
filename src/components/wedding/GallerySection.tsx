import { useCallback, useEffect, useState } from "react";

import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import weddingData from "@/payloads/wedding";

// 표시 순서(값 = gallery.images 인덱스, 0-based). 가로 사진(24·26·27·28 → 인덱스
// 23·25·26·27)은 와이드(--full)로, 유사컷은 서로 떨어뜨려 배치한다. 일반 셀은
// 항상 쌍(2개) 단위로만 넣어 풀폭 블록 사이가 홀수가 되지 않도록 한다.
const displayOrder = [
  17, 2, 1, 23, 8, 16, 4, 12, 19, 13, 24, 26, 10, 6, 9, 28, 5, 18, 7, 25, 14, 15, 20, 33, 32, 21, 29, 27, 22, 30, 0, 11,
  3, 31,
];
const INITIAL_COUNT = 6;

// 2칸을 차지하는 블록. CSS grid 특성상 풀폭 블록 사이의 일반 셀 개수가
// 홀수면 빈칸/외톨이가 생기므로, 항상 짝수가 되도록 위치를 맞춘다.
const HERO_POSITIONS = new Set([0, 8, 16, 24]); // 세로 대형(3/4): 커플 18·20·06·33
const FULL_POSITIONS = new Set([3, 11, 19, 27]); // 가로 와이드(4/3): 24·27·26·28

const getItemClassName = (displayIndex: number): string => {
  if (HERO_POSITIONS.has(displayIndex)) return "gallery-item gallery-item--hero";
  if (FULL_POSITIONS.has(displayIndex)) return "gallery-item gallery-item--full";
  return "gallery-item";
};

const GallerySection: React.FC = () => {
  const { gallery } = weddingData;
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);

  const orderedImages = displayOrder.map((i) => gallery.images[i]);
  const visibleImages = showAll ? orderedImages : orderedImages.slice(0, INITIAL_COUNT);

  const openLightbox = (displayIndex: number) => {
    setCurrentDisplayIndex(displayIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentDisplayIndex((prev) => (prev === 0 ? displayOrder.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentDisplayIndex((prev) => (prev === displayOrder.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  return (
    <section className="gallery-section">
      <div className="section-header">
        <h2 className="section-title">GALLERY</h2>
        <p className="section-subtitle">웨딩 갤러리</p>
      </div>

      <div className="gallery-grid">
        {visibleImages.map((image, index) => (
          <div key={index} className={getItemClassName(index)} onClick={() => openLightbox(index)}>
            <img src={image} alt={`Gallery ${index + 1}`} />
          </div>
        ))}
      </div>

      {orderedImages.length > INITIAL_COUNT && (
        <div className="gallery-more">
          <button className="btn-more" onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? "접기" : "더보기"}
          </button>
        </div>
      )}

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={orderedImages[currentDisplayIndex]} alt={`Gallery ${currentDisplayIndex + 1}`} />
            <div className="lightbox-counter">
              {currentDisplayIndex + 1} / {orderedImages.length}
            </div>
          </div>
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
