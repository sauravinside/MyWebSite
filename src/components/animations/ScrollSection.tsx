// src/components/animations/ScrollSection.tsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
}

export default function ScrollSection({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  // Set transform values based on direction
  let x = { from: 0, to: 0 };
  let y = { from: 0, to: 0 };
  
  if (direction === 'up') {
    y = { from: 50, to: 0 };
  } else if (direction === 'down') {
    y = { from: -50, to: 0 };
  } else if (direction === 'left') {
    x = { from: 50, to: 0 };
  } else if (direction === 'right') {
    x = { from: -50, to: 0 };
  }
  
  // Create transform values for animations
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const translateX = useTransform(scrollYProgress, [0, 0.2], [x.from, x.to]);
  const translateY = useTransform(scrollYProgress, [0, 0.2], [y.from, y.to]);
  
  return (
    <motion.div
      ref={ref}
      style={{ opacity, x: translateX, y: translateY }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}