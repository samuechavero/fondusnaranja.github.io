import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  featured?: boolean;
  'data-testid'?: string;
}

export function TiltCard({
  children,
  className = '',
  onClick,
  featured = false,
  'data-testid': testId,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords normalized between -0.5 and 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for rotation
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  // Glow position coords (percentage)
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    setGlowPos({ x: px, y: py });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div style={{ perspective: 1200 }} className="relative h-full">
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`relative overflow-hidden cursor-pointer rounded-2xl sm:rounded-3xl transition-all duration-300 ${className}`}
        data-testid={testId}
      >
        {/* Dynamic ambient rim-glow spotlight following the cursor */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10 rounded-2xl sm:rounded-3xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${glowPos.x}% ${glowPos.y}%, ${
              featured ? 'rgba(255, 90, 0, 0.25)' : 'rgba(16, 185, 129, 0.2)'
            }, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
export default TiltCard;
