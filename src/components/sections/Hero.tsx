'use client';

// src/components/sections/Hero.tsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import Terminal from '../terminal/Terminal';
import ParticleField from '../3d/ParticleField';

export default function Hero() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [typedIntro, setTypedIntro] = useState('');
  const introText = `
Hello. I'm Saurav Singh.
Cloud Engineer & DevOps Specialist.
AWS | GCP | Azure | Terraform | Kubernetes

Type 'help' to see available commands or 'about' to learn more about me.
`;

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    
    const typeNextCharacter = () => {
      if (currentIndex < introText.length) {
        currentText += introText.charAt(currentIndex);
        setTypedIntro(currentText);
        currentIndex++;
        setTimeout(typeNextCharacter, Math.random() * 40 + 20); // Random typing speed for realistic effect
      }
    };
    
    setTimeout(() => {
      typeNextCharacter();
    }, 500);
  }, []);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden" id="home">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div 
            ref={terminalRef}
            className="terminal-window w-full max-w-3xl mx-auto bg-terminal-black border border-terminal-gray rounded-lg shadow-terminal overflow-hidden"
          >
            <div className="flex items-center p-2 bg-terminal-gray">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
              </div>
              <div className="mx-auto text-sm text-terminal-white font-mono">
                terminal@saurav-singh ~ 
              </div>
            </div>
            
            <div className="p-4 font-mono text-sm">
              <div className="mb-4">
                <span className="text-terminal-green">$ </span>
                <span className="text-terminal-white">./welcome.sh</span>
              </div>
              
              <pre className="text-terminal-white whitespace-pre-line">
                {typedIntro}
                {typedIntro.length === introText.length && (
                  <span className="cursor"></span>
                )}
              </pre>
              
              <Terminal />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-terminal-white text-sm mb-2 font-mono">Scroll Down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
        >
          <FaChevronDown className="text-terminal-green text-2xl" />
        </motion.div>
      </motion.div>
    </section>
  );
}