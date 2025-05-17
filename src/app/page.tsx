'use client';

// src/app/page.tsx
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Certifications from '@/components/sections/Certifications';
import Contact from '@/components/sections/Contact';

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  // Initialize smooth scrolling and GSAP ScrollTrigger
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Connect lenis to RAF (request animation frame)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    // Pin the sections for the scroll experience
    if (mainRef.current) {
      // Set up each section for scroll-based animations
      const sections = mainRef.current.querySelectorAll('section');
      
      sections.forEach((section, index) => {
        // Skip the first section (hero) for pinning
        if (index === 0) return;
        
        const nextSection = sections[index + 1];
        
        if (nextSection) {
          gsap.to(section, {
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
              scrub: true,
            }
          });
        }
      });
    }
    
    // Cleanup function
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main ref={mainRef} className="overflow-x-hidden">
      <Navbar />
      <div className="relative">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </div>
    </main>
  );
}