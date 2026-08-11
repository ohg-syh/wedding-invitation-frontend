import weddingData from "@/payloads/wedding";

const NoticeSection: React.FC = () => {
  const { messages } = weddingData;

  if (!messages.notice) return null;

  return (
    <section className="notice-section">
      <div className="section-header">
        <h2 className="section-title">NOTICE</h2>
        <p className="section-subtitle">포토부스 이용안내</p>
      </div>
      <div className="notice-content">
        <p className="notice-text">{messages.notice}</p>
      </div>
    </section>
  );
};

export default NoticeSection;
