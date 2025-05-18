import { gsap } from 'gsap';

// Text reveal animation
export const textRevealAnimation = (element: HTMLElement, delay: number = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power3.out'
    }
  );
};

// Scroll fade animation
export const scrollFadeAnimation = (element: HTMLElement, trigger?: HTMLElement) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50
    },
    {
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }
  );
};

// Parallax effect
export const parallaxEffect = (element: HTMLElement, strength: number = 0.1) => {
  gsap.to(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    },
    y: (_, target) => {
      const scroll = window.scrollY - target.getBoundingClientRect().top;
      return scroll * strength * -1;
    },
    ease: 'none'
  });
};

// Terminal typing effect
export const terminalTypingEffect = (
  element: HTMLElement, 
  text: string, 
  speed: number = 50,
  onComplete?: () => void
) => {
  let i = 0;
  element.textContent = '';
  
  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
      if (onComplete) onComplete();
    }
  }, speed);
  
  return () => clearInterval(typing);
};

// Stagger animation
export const staggerAnimation = (
  elements: HTMLElement[], 
  delay: number = 0.1,
  duration: number = 0.5
) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 20
    },
    {
      opacity: 1,
      y: 0,
      stagger: delay,
      duration,
      ease: 'power2.out'
    }
  );
};
