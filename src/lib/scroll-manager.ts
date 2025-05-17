// src/lib/scroll-manager.ts

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class ScrollManager {
  private lenis: Lenis | null = null;
  
  constructor() {
    if (typeof window === 'undefined') return;
    
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
  }
  
  init() {
    if (typeof window === 'undefined') return;
    
    // Initialize Lenis for smooth scrolling
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    // Connect lenis to RAF (request animation frame)
    const raf = (time: number) => {
      if (this.lenis) {
        this.lenis.raf(time);
        requestAnimationFrame(raf);
      }
    };
    
    requestAnimationFrame(raf);
    
    // Connect Lenis to GSAP ScrollTrigger
    if (this.lenis) {
      this.lenis.on('scroll', ScrollTrigger.update);
      
      gsap.ticker.add((time) => {
        if (this.lenis) {
          this.lenis.raf(time * 1000);
        }
      });
    }
  }
  
  setup(container: HTMLElement) {
    if (typeof window === 'undefined') return;
    
    // Set up each section for scroll-based animations
    const sections = container.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      // Skip the first section (hero) for pinning
      if (index === 0) return;
      
      // Setup GSAP ScrollTrigger for the section
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
    });
  }
  
  scrollTo(target: string | HTMLElement, options?: { offset?: number; duration?: number }) {
    if (!this.lenis) return;
    
    this.lenis.scrollTo(target, options);
  }
  
  destroy() {
    if (this.lenis) {
      this.lenis.destroy();
      this.lenis = null;
    }
    
    // Clean up all ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}

export default new ScrollManager();