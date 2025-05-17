'use client';

import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'primary' | 'aws' | 'gcp' | 'azure' | 'green' | 'blue' | 'purple' | 'pink' | 'yellow' | 'red';
  size?: 'sm' | 'md';
  className?: string;
}

export default function Badge({
  children,
  color = 'primary',
  size = 'md',
  className = '',
}: BadgeProps) {
  const baseStyles = "inline-flex items-center font-medium rounded-full";
  
  const colorStyles = {
    primary: "bg-terminal-gray/20 text-terminal-white",
    aws: "bg-aws/20 text-aws",
    gcp: "bg-gcp/20 text-gcp",
    azure: "bg-azure/20 text-azure",
    green: "bg-terminal-green/20 text-terminal-green",
    blue: "bg-terminal-blue/20 text-terminal-blue",
    purple: "bg-terminal-purple/20 text-terminal-purple",
    pink: "bg-terminal-pink/20 text-terminal-pink",
    yellow: "bg-terminal-yellow/20 text-terminal-yellow",
    red: "bg-terminal-red/20 text-terminal-red",
  };
  
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };
  
  return (
    <span className={`${baseStyles} ${colorStyles[color]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
}