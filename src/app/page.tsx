'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

// Lazy load heavy components to prevent lag
const Experience = dynamic(() => import('@/components/sections/Experience'), { ssr: false });
const Projects = dynamic(() => import('@/components/sections/Projects'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });
const Certifications = dynamic(() => import('@/components/sections/Certifications'), { ssr: false });
const Contact = dynamic(() => import('@/components/sections/Contact'), { ssr: false });

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Optimized Lenis settings for smoothness
    const lenis = new Lenis({
      lerp: 0.1, // Adjust this (0.1 to 0.05) for smoother feel
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    
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
