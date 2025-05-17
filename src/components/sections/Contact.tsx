'use client';

// src/components/sections/Contact.tsx
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import TextReveal from '../animations/TextReveal';

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setError('Please fill out all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    
    // Clear any errors
    setError('');
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      // Reset form
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };
  
  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Terminal-themed background */}
      <div className="absolute inset-0 terminal-gradient opacity-90 z-0"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-background z-0 opacity-20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Get In Touch</h2>
          </TextReveal>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-card p-6">
                <h3 className="text-2xl font-bold text-terminal-green mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-terminal-green/20 flex items-center justify-center text-terminal-green">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-gray">Email</p>
                      <p className="font-medium">singhsaurav400@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-terminal-pink/20 flex items-center justify-center text-terminal-pink">
                      <FaPhone />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-gray">Phone</p>
                      <p className="font-medium">+91-9899123603</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-terminal-blue/20 flex items-center justify-center text-terminal-blue">
                      <FaGlobe />
                    </div>
                    <div>
                      <p className="text-sm text-terminal-gray">Website</p>
                      <p className="font-medium">www.sauravsingh.tech</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-terminal-gray/20">
                  <h4 className="text-lg font-bold text-terminal-white mb-4">Connect With Me</h4>
                  
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/sauravinside"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-terminal-gray/20 flex items-center justify-center text-terminal-white hover:bg-terminal-gray/50 transition-colors"
                    >
                      <FaGithub size={24} />
                    </a>
                    
                    <a
                      href="https://www.linkedin.com/in/saurav-singh-81321b16a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-terminal-gray/20 flex items-center justify-center text-terminal-white hover:bg-terminal-gray/50 transition-colors"
                    >
                      <FaLinkedin size={24} />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Terminal-themed info */}
              <div className="terminal-window">
                <div className="flex items-center p-2 bg-terminal-gray">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                    <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                  </div>
                  <div className="mx-auto text-sm text-terminal-white font-mono">
                    availability.sh
                  </div>
                </div>
                
                <div className="p-4 font-mono text-sm">
                  <div className="mb-4">
                    <span className="text-terminal-green">$ </span>
                    <span className="text-terminal-white">./check-availability.sh</span>
                  </div>
                  
                  <p className="text-terminal-white">Checking availability for <span className="text-terminal-pink">Saurav Singh</span>...</p>
                  
                  <div className="mt-4 space-y-2">
                    <p className="text-terminal-green">✓ Available for freelance projects</p>
                    <p className="text-terminal-green">✓ Open to collaboration opportunities</p>
                    <p className="text-terminal-green">✓ Interested in challenging cloud infrastructure projects</p>
                    <p className="text-terminal-green">✓ Available for consulting on AWS/GCP architecture</p>
                  </div>
                  
                  <div className="mt-4 border-t border-terminal-gray pt-4">
                    <p className="text-terminal-yellow">STATUS: <span className="text-terminal-cyan">Ready for new opportunities</span></p>
                    <p className="text-terminal-yellow">RESPONSE TIME: <span className="text-terminal-cyan">Usually within 24 hours</span></p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="glass-card p-6 h-full">
                <h3 className="text-2xl font-bold text-terminal-purple mb-6">Send Me a Message</h3>
                
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="h-full flex flex-col justify-center items-center text-center p-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-terminal-green/20 flex items-center justify-center text-terminal-green mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-terminal-white mb-2">Message Sent!</h4>
                    <p className="text-terminal-gray">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-4 py-2 bg-terminal-purple/20 hover:bg-terminal-purple/40 text-terminal-purple rounded-md transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-terminal-white mb-1">
                        Name <span className="text-terminal-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-terminal-black/30 border border-terminal-gray/30 text-terminal-white focus:outline-none focus:ring-2 focus:ring-terminal-purple/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-terminal-white mb-1">
                        Email <span className="text-terminal-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-terminal-black/30 border border-terminal-gray/30 text-terminal-white focus:outline-none focus:ring-2 focus:ring-terminal-purple/50"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-terminal-white mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-terminal-black/30 border border-terminal-gray/30 text-terminal-white focus:outline-none focus:ring-2 focus:ring-terminal-purple/50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-terminal-white mb-1">
                        Message <span className="text-terminal-red">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full px-4 py-2 rounded-md bg-terminal-black/30 border border-terminal-gray/30 text-terminal-white focus:outline-none focus:ring-2 focus:ring-terminal-purple/50 resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    {error && (
                      <div className="text-terminal-red text-sm">
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full px-4 py-3 bg-gradient-to-r from-terminal-purple to-terminal-pink text-white font-medium rounded-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-terminal-purple/50"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <p className="text-terminal-gray">
              &copy; {new Date().getFullYear()} Saurav Singh. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-terminal-gray">
              Designed and built with <span className="text-terminal-pink">❤</span> using Next.js, Framer Motion, and Three.js
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}