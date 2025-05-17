// src/components/animations/ParallaxText.tsx

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function ParallaxText({
  children,
  baseVelocity = 100,
  direction = 'left',
  className = '',
}: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Adjust velocity based on scroll position
  const velocity = useTransform(
    scrollYProgress,
    [0, 1],
    [0, direction === 'left' ? -baseVelocity : baseVelocity]
  );
  
  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div
        className="inline-block"
        style={{ x: velocity }}
      >
        <span className="inline-block">{children}</span>
        <span className="inline-block ml-8">{children}</span>
      </motion.div>
    </div>
  );
}