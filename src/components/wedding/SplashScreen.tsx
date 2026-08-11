import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { DateTime } from "luxon";

import weddingData from "@/payloads/wedding";

interface SplashScreenProps {
  onComplete: () => void;
}

const splashTexts = [
  { main: "MEANT TO BE", sub: "FROM THE VERY START" },
  { main: "OUR FOREVER", sub: "BEGINS HERE" },
  { main: "", sub: "" },
];

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const wordVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { groom, bride, ceremony, splash } = weddingData;
  const weddingDate = DateTime.fromISO(ceremony.date);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next >= splash.images.length) {
          clearInterval(imageInterval);
          setTimeout(onComplete, 1200);
          return prev;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(imageInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLastSlide = currentIndex === splash.images.length - 1;

  return (
    <motion.div className="splash-screen" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <button className="splash-skip" onClick={onComplete}>
        SKIP
      </button>

      <div className="splash-background">
        {splash.images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={`Splash ${index + 1}`}
            className="splash-background-image"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: currentIndex === index ? 1 : 0,
              scale: currentIndex === index ? 1 : 1.1,
            }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          />
        ))}
      </div>

      <div className="splash-content">
        <AnimatePresence mode="wait">
          {!isLastSlide && splashTexts[currentIndex] && (
            <motion.div
              key={`text-${currentIndex}`}
              className="splash-text-group"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6 }}
            >
              <motion.p className="splash-main-text" variants={wordVariants} initial="hidden" animate="visible">
                {splashTexts[currentIndex].main.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ display: "inline-block" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.p>
              <motion.p
                className="splash-sub-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              >
                {splashTexts[currentIndex].sub}
              </motion.p>
            </motion.div>
          )}

          {isLastSlide && (
            <motion.div
              key="final"
              className="splash-final"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="splash-title"
                initial={{ opacity: 0, letterSpacing: "0.4em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ delay: 0.2, duration: 1 }}
              >
                WEDDING
                <br />
                INVITATION
              </motion.h1>
              <motion.div
                className="splash-names"
                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <span className="groom-name">{groom.name}</span>
                <span className="heart">♥</span>
                <span className="bride-name">{bride.name}</span>
              </motion.div>
              <motion.div
                className="splash-date"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                {weddingDate.toFormat("yyyy.MM.dd")}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
