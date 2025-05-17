'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  hoverEffect = false,
  onClick
}: CardProps) {
  const baseStyles = "rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm";
  
  const cardContent = (
    <div className={`${baseStyles} ${className}`}>
      {children}
    </div>
  );
  
  if (hoverEffect) {
    return (
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        whileTap={{ y: 0 }}
        onClick={onClick}
        className={onClick ? 'cursor-pointer' : ''}
      >
        {cardContent}
      </motion.div>
    );
  }
  
  return (
    <div onClick={onClick} className={onClick ? 'cursor-pointer' : ''}>
      {cardContent}
    </div>
  );
}