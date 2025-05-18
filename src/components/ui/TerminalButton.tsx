import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TerminalButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  commandPrefix?: boolean;
}

const TerminalButton: React.FC<TerminalButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  className = '',
  type = 'button',
  fullWidth = false,
  commandPrefix = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Base styles
  const baseStyles = "font-mono transition-all duration-300 focus:outline-none rounded";
  
  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  
  // Variant styles
  const variantStyles = {
    primary: "bg-terminal-purple text-white hover:bg-terminal-pink border border-transparent",
    secondary: "bg-terminal-gray/20 text-terminal-white hover:bg-terminal-gray/30 border border-transparent",
    outline: "bg-transparent border border-terminal-green text-terminal-green hover:bg-terminal-green/10",
    ghost: "bg-transparent text-terminal-white hover:bg-terminal-gray/10 border border-transparent",
  };
  
  // Width styles
  const widthStyles = fullWidth ? "w-full" : "";
  
  // Disabled styles
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center">
        {/* Command prefix */}
        {commandPrefix && (
          <span className="text-terminal-green mr-2">$</span>
        )}
        
        {/* Icon */}
        {icon && (
          <span className="mr-2">{icon}</span>
        )}
        
        {/* Text */}
        <span>{children}</span>
        
        {/* Cursor blink effect */}
        {isHovered && variant !== 'primary' && (
          <span className="inline-block ml-1 w-1.5 h-4 bg-terminal-green animate-terminal-cursor"></span>
        )}
      </div>
    </motion.button>
  );
};

export default TerminalButton;