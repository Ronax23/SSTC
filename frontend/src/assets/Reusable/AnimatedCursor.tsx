import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion"; // Highly recommended for animations

export default function AnimatedCursor() {

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const springConfig = { damping: 25, stiffness: 150 };
  const dotX = useSpring(0, springConfig);
  const dotY = useSpring(0, springConfig);

 useEffect(() => {
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleMove = (e:MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      dotX.set(e.clientX - 6); 
      dotY.set(e.clientY - 6);
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousemove", handleMove);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousemove", handleMove);
    };
  }, [dotX, dotY, isVisible]);

  return (
    <>
      <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      className="mousepoint"
        style={{
          x: dotX,
          y: dotY,
        }}
/>
    </>
  );
};