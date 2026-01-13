'use client';

// src/components/sections/About.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaServer, FaCloud, FaCode } from 'react-icons/fa';
import Image from 'next/image'; // Added for profile picture
import CloudScene from '../3d/CloudScene';
import TextReveal from '../animations/TextReveal';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax and opacity effects based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  
  return (
    <section 
      id="about" 
      ref={containerRef}
      className="min-h-screen w-full relative py-20 overflow-hidden"
    >
      {/* Background with grid pattern */}
      <div className="absolute inset-0 grid-background z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          style={{ opacity, y }}
          className="max-w-6xl mx-auto"
        >
          <TextReveal>
            <h2 className="section-heading text-center">About Me</h2>
          </TextReveal>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-2xl font-bold text-terminal-green mb-4">Who I Am</h3>
                <p className="text-lg">
                  I'm a <span className="text-terminal-pink font-medium">Cloud Engineer</span> with over 3 years of 
                  experience specializing in AWS, GCP, Azure, and OCI environments. An automation 
                  enthusiast with strong communication skills and a passion for developing innovative 
                  solutions to complex cloud infrastructure challenges.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-2xl font-bold text-terminal-purple mb-4">My Approach</h3>
                <p className="text-lg mb-4">
                  I believe in creating <span className="text-terminal-yellow font-medium">scalable</span>, 
                  <span className="text-terminal-cyan font-medium"> secure</span>, and 
                  <span className="text-terminal-green font-medium"> efficient</span> cloud solutions that meet 
                  specific business needs while optimizing for performance and cost.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-terminal-green/20 rounded-full flex items-center justify-center text-terminal-green mb-3">
                      <FaCloud size={28} />
                    </div>
                    <h4 className="font-medium">Cloud Architecture</h4>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-terminal-purple/20 rounded-full flex items-center justify-center text-terminal-purple mb-3">
                      <FaServer size={28} />
                    </div>
                    <h4 className="font-medium">Infrastructure as Code</h4>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-terminal-pink/20 rounded-full flex items-center justify-center text-terminal-pink mb-3">
                      <FaCode size={28} />
                    </div>
                    <h4 className="font-medium">DevOps Automation</h4>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <h3 className="text-2xl font-bold text-terminal-cyan mb-4">My Journey</h3>
                <p className="text-lg">
                  From starting as an AWS Cloud Practitioner intern to becoming a specialized Cloud Engineer, 
                  I've consistently expanded my knowledge and expertise across multiple cloud platforms.
                  My experience includes migration projects, implementing CI/CD pipelines, 
                  and creating robust infrastructure solutions with Terraform and Kubernetes.
                </p>
              </motion.div>
            </div>
            
            {/* 3D Cloud Scene & Profile Picture */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="h-full min-h-[400px] flex items-center justify-center relative"
            >
              {/* Profile Picture Background Layer */}
              <div className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
                <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-terminal-purple/30">
                  <Image 
                    src="/images/profile.jpg" 
                    alt="Saurav Singh" 
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* 3D Scene Layer */}
              <div className="w-full h-full absolute z-10">
                <CloudScene />
              </div>
              
              {/* Certification badges floating */}
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                  className="w-16 h-16 rounded-full bg-gcp/90 flex items-center justify-center shadow-lg"
                >
                  <img src="/images/certifications/gcp.png" alt="GCP" className="w-12 h-12" />
                </motion.div>
              </div>
              
              <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                  className="w-16 h-16 rounded-full bg-aws/90 flex items-center justify-center shadow-lg"
                >
                  <img src="/images/certifications/aws.png" alt="AWS" className="w-12 h-12" />
                </motion.div>
              </div>
              
              <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                  className="w-16 h-16 rounded-full bg-azure/90 flex items-center justify-center shadow-lg"
                >
                  <img src="/images/certifications/azure.png" alt="Azure" className="w-12 h-12" />
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Terminal-inspired quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="terminal-window mt-16 max-w-3xl mx-auto"
          >
            <div className="p-4 font-mono">
              <div className="flex">
                <span className="text-terminal-green">$ </span>
                <span className="text-terminal-white ml-1">echo $PHILOSOPHY</span>
              </div>
              <div className="mt-2 text-terminal-cyan italic">
                "Infrastructure should be reproducible, scalable, and secure. Cloud is not just about servers and storage—it's about creating environments that empower businesses to innovate and grow."
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
