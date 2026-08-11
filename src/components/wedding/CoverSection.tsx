import { motion } from "framer-motion";
import { DateTime } from "luxon";

import weddingData from "@/payloads/wedding";

const CoverSection: React.FC = () => {
  const { ceremony, gallery } = weddingData;
  const weddingDate = DateTime.fromISO(ceremony.date);
  const month = weddingDate.toFormat("MM");
  const day = weddingDate.toFormat("dd");
  const year = weddingDate.toFormat("yyyy");

  return (
    <motion.section
      className="cover-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="cover-background">
        <img src={gallery.main} alt="Wedding Cover" className="cover-image" />
        <div className="sparkles">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="sparkle" />
          ))}
        </div>
      </div>

      <motion.div
        className="cover-overlay"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
      >
        <div className="cover-top-text">
          <span className="top-left">SIMPLY</span>
          <span className="top-right">MEANT</span>
        </div>

        <div className="date-display-large">
          <div className="date-number">
            <span className="number">{year}</span>
            <span className="unit">년</span>
          </div>
          <div className="date-number">
            <span className="number">{month}</span>
            <span className="unit">월</span>
          </div>
          <div className="date-number">
            <span className="number">{day}</span>
            <span className="unit">일</span>
          </div>
        </div>

        <div className="cover-bottom-text">
          <span className="bottom-left">TO BE</span>
          <span className="bottom-right">TOGETHER</span>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CoverSection;
