import { useCallback, useState } from "react";

import { motion } from "framer-motion";

import { defaultViewport, fadeInUpVariants } from "@/utils/animations";

import AccountSection from "@/components/wedding/AccountSection";
import CalendarSection from "@/components/wedding/CalendarSection";
import CoverSection from "@/components/wedding/CoverSection";
import FooterSection from "@/components/wedding/FooterSection";
import GallerySection from "@/components/wedding/GallerySection";
import GuestbookSection from "@/components/wedding/GuestbookSection";
import GuideSection from "@/components/wedding/GuideSection";
import InvitationSection from "@/components/wedding/InvitationSection";
import LocationSection from "@/components/wedding/LocationSection";
import NoticeSection from "@/components/wedding/NoticeSection";
import SplashScreen from "@/components/wedding/SplashScreen";

const WeddingInvitation: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="wedding-invitation">
      <CoverSection />

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <InvitationSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <GallerySection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <CalendarSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <LocationSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <GuideSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <NoticeSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <GuestbookSection />
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={defaultViewport} variants={fadeInUpVariants}>
        <AccountSection />
      </motion.div>

      <FooterSection />
    </div>
  );
};

export default WeddingInvitation;
