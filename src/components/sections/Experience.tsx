'use client';

// src/components/sections/Experience.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaAws, FaGoogle, FaMicrosoft, FaDocker, FaPython, FaLinux } from 'react-icons/fa';
import { SiTerraform, SiKubernetes } from 'react-icons/si';
import TextReveal from '../animations/TextReveal';

// Experience data
const experiences = [
  {
    id: 1,
    company: 'Searce Cosourcing Pvt Ltd',
    position: 'Cloud Engineer',
    duration: 'June 2022 - Present',
    location: 'Gurugram, India',
    description: 'Working on enterprise-level cloud infrastructure and DevOps solutions.',
    responsibilities: [
      'Terraform modules and CloudFormation development',
      'Cloud migration (Azure to GCP, AWS to GCP)',
      'Linux servers & EKS administration',
      'Monitoring with Prometheus and Grafana',
      'Kubernetes clusters management with Anthos',
      'Shell/Python scripting for automation',
      'WAF & SIEM implementation'
    ],
    technologies: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'Python', 'Linux'],
    icons: [FaAws, FaGoogle, SiTerraform, SiKubernetes, FaPython, FaLinux]
  },
  {
    id: 2,
    company: 'Intellipaat Software Solutions',
    position: 'Lead Cloud Analyst',
    duration: 'June 2021 - May 2022',
    location: 'Bangalore, India',
    description: 'Led cloud infrastructure projects and provided technical consulting.',
    responsibilities: [
      'CI/CD pipeline implementation (GitHub Actions, Jenkins, CodePipeline)',
      'Security best practices and AWS Governance',
      'Linux configuration with Apache and PHP',
      'Python automation with BOTO SDK',
      'OpenShift and EKS implementation'
    ],
    technologies: ['AWS', 'CI/CD', 'Docker', 'Python', 'Terraform', 'GCP'],
    icons: [FaAws, FaDocker, FaPython, SiTerraform, FaGoogle]
  },
  {
    id: 3,
    company: 'Department Of Youth Capital',
    position: 'AWS Cloud Practitioner (Internship)',
    duration: 'Jan 2021 - Jun 2021',
    location: 'Jalandhar, Punjab, India',
    description: 'Gained hands-on experience with AWS cloud services and infrastructure.',
    responsibilities: [
      'Static website hosting on VMs and S3',
      'Route53 DNS management',
      'Basic cloud services implementation'
    ],
    technologies: ['AWS', 'Linux', 'Python'],
    icons: [FaAws, FaLinux, FaPython]
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  
  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Terminal-themed background */}
      <div className="absolute inset-0 terminal-gradient opacity-90 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Professional Journey</h2>
          </TextReveal>
          
          <div className="mt-20 relative">
            {/* Timeline line */}
            <div className="absolute w-1 bg-gradient-to-b from-terminal-pink to-terminal-purple h-full left-[9px] top-0 md:left-1/2 md:-translate-x-1/2 rounded-full"></div>
            
            {/* Timeline items */}
            <div className="space-y-20">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline indicator */}
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-5 h-5 rounded-full bg-terminal-purple border-4 border-terminal-black z-20 mt-2"></div>
                  
                  {/* Content */}
                  <div className={`md:w-1/2 pl-10 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-16 text-right' : 'md:pl-16 text-left'
                  }`}>
                    <div className="glass-card p-6 h-full">
                      <div className="mb-4">
                        <span className="text-terminal-green text-sm font-mono">{experience.duration}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-terminal-purple mb-1">{experience.position}</h3>
                      <h4 className="text-xl mb-4 text-terminal-white">
                        {experience.company}
                      </h4>
                      <div className="flex items-center text-sm font-mono text-terminal-gray mb-4">
                        <span>{experience.location}</span>
                      </div>
                      <p className="text-terminal-white mb-6">{experience.description}</p>
                      
                      <div className="space-y-1">
                        {experience.responsibilities.map((responsibility, i) => (
                          <div key={i} className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                            <div className="inline-flex">
                              <span className="text-terminal-pink">{'>'}</span>
                              <span className="ml-2">{responsibility}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className={`flex flex-wrap gap-2 mt-6 ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                        {experience.technologies.map((tech, i) => (
                          <div key={i} className="tag-cloud-item bg-terminal-black/50 text-terminal-white">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Technology icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-24 text-center"
          >
            <h3 className="text-2xl font-bold text-terminal-cyan mb-8">Technology Stack</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="skill-badge aws-badge">
                <FaAws size={20} /> AWS
              </div>
              <div className="skill-badge gcp-badge">
                <FaGoogle size={20} /> GCP
              </div>
              <div className="skill-badge azure-badge">
                <FaMicrosoft size={20} /> Azure
              </div>
              <div className="skill-badge bg-terminal-purple/20 text-terminal-purple">
                <SiTerraform size={20} /> Terraform
              </div>
              <div className="skill-badge bg-terminal-blue/20 text-terminal-blue">
                <SiKubernetes size={20} /> Kubernetes
              </div>
              <div className="skill-badge bg-terminal-green/20 text-terminal-green">
                <FaPython size={20} /> Python
              </div>
              <div className="skill-badge bg-terminal-pink/20 text-terminal-pink">
                <FaDocker size={20} /> Docker
              </div>
              <div className="skill-badge bg-terminal-yellow/20 text-terminal-yellow">
                <FaLinux size={20} /> Linux
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}