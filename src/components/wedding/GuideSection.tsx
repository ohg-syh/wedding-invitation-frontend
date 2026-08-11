import weddingData from "@/payloads/wedding";

const GuideSection: React.FC = () => {
  const { guide } = weddingData;

  if (!guide?.image) return null;

  return (
    <section className="guide-section">
      <div className="guide-content">
        <img src={guide.image} alt="예식 안내문" className="guide-image" />
      </div>
    </section>
  );
};

export default GuideSection;
