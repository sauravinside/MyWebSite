'use client';

// src/components/sections/Experience.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaAws, FaGoogle, FaDocker, FaPython, FaLinux } from 'react-icons/fa';
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

// Timeline item component
const TimelineItem = ({ experience, isLeft, index }: {
  experience: typeof experiences[0];
  isLeft: boolean;
  index: number;
}) => {
  // Calculate appropriate text alignment based on position
  const textAlign = isLeft ? 'text-right' : 'text-left';
  const flexDirection = isLeft ? 'flex-row-reverse' : 'flex-row';
  
  return (
    <motion.div
      className={`flex ${flexDirection} mb-16`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Content */}
      <div className="w-1/2 px-8">
        <motion.div
          className="glass-card p-6 overflow-hidden relative"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          {/* Colored accent border */}
          <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full bg-gradient-to-b from-terminal-purple to-terminal-pink`}></div>
          
          <div className={`${textAlign}`}>
            <div className="mb-2 inline-block font-mono text-sm py-1 px-2 rounded bg-terminal-gray/30 text-terminal-white">
              {experience.duration}
            </div>
            <h3 className="text-xl font-bold text-terminal-pink mb-1">{experience.position}</h3>
            <h4 className="text-lg text-terminal-white mb-2">{experience.company}</h4>
            <div className="text-sm text-terminal-gray mb-4">{experience.location}</div>
            
            <p className="text-terminal-white/80 mb-4">{experience.description}</p>
            
            {/* Responsibilities */}
            <div className={`space-y-2 mb-6 ${isLeft ? 'ml-auto' : 'mr-auto'}`}>
              {experience.responsibilities.map((responsibility, i) => (
                <div key={i} className={`flex ${isLeft ? 'justify-end' : 'justify-start'} text-sm`}>
                  <div className="flex items-start">
                    <span className="text-terminal-purple mr-2">&gt;</span>
                    <span className="text-terminal-white">{responsibility}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Technologies */}
            <div className={`flex flex-wrap gap-2 mt-4 ${isLeft ? 'justify-end' : 'justify-start'}`}>
              {experience.technologies.map((tech, i) => {
                const Icon = experience.icons[i];
                
                return (
                  <div 
                    key={i} 
                    className="px-2 py-1 rounded bg-terminal-blue/10 text-terminal-blue text-xs flex items-center"
                  >
                    {Icon && <Icon className="mr-1" size={12} />}
                    {tech}
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Empty space for the other side */}
      <div className="w-1/2"></div>
    </motion.div>
  );
};

// Calculate total experience in years
const calculateTotalExperience = (): string => {
  // This is just a placeholder function
  // In a real implementation, you would calculate the actual years based on the dates
  return '3+';
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Background with grid pattern */}
      <div className="absolute inset-0 grid-background opacity-20 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Professional Experience</h2>
          </TextReveal>
          
          {/* Timeline */}
          <div className="relative py-8 mt-12">
            {/* Central timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-terminal-pink to-terminal-purple rounded"></div>
            
            {/* Timeline nodes */}
            {experiences.map((experience, index) => (
              <div key={experience.id}>
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex justify-center items-center">
                  <div 
                    className="w-6 h-6 rounded-full border-4 border-terminal-black z-10 bg-terminal-purple"
                    style={{ top: `${index * 240 + 70}px` }}
                  ></div>
                  
                  {/* Year marker */}
                  <div 
                    className="absolute font-mono text-terminal-purple text-sm"
                    style={{ 
                      top: `${index * 240 + 70}px`,
                      [index % 2 === 0 ? 'left' : 'right']: '30px',
                    }}
                  >
                    {experience.duration.split(' - ')[0]}
                  </div>
                </div>
                
                <TimelineItem 
                  experience={experience} 
                  isLeft={index % 2 === 0} 
                  index={index}
                />
              </div>
            ))}
            
            {/* Terminal command for exploring experience */}
            <motion.div
              className="mt-16 terminal-window max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center p-2 bg-terminal-gray">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="mx-auto text-sm text-terminal-white font-mono">
                  experience-summary.sh
                </div>
              </div>
              
              <div className="p-4 font-mono text-sm">
                <div className="mb-4">
                  <span className="text-terminal-green">$ </span>
                  <span className="text-terminal-white">./summarize-experience.sh</span>
                </div>
                
                <div className="mb-4">
                  <p className="text-terminal-cyan"># Experience Summary</p>
                  <p className="text-terminal-white mt-2">
                    Total Experience: {calculateTotalExperience()} years
                  </p>
                  
                  <div className="mt-4">
                    <p className="text-terminal-cyan"># Core Competencies</p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">Cloud Architecture</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">Infrastructure as Code</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">DevOps Automation</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">Multi-Cloud Management</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">Cloud Migration</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-terminal-green mr-2">✓</span>
                        <span className="text-terminal-white">Security & Compliance</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-terminal-cyan"># Skill Progression</p>
                    <div className="mt-2 h-8 relative w-full bg-terminal-black/50 rounded overflow-hidden">
                      <motion.div 
                        className="absolute h-full flex"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2 }}
                      >
                        <div className="h-full bg-aws" style={{ width: '25%' }}></div>
                        <div className="h-full bg-gcp" style={{ width: '30%' }}></div>
                        <div className="h-full bg-azure" style={{ width: '15%' }}></div>
                        <div className="h-full bg-terminal-purple" style={{ width: '30%' }}></div>
                      </motion.div>
                      
                      <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-between px-2 items-center text-xs text-white">
                        <span>Cloud Practitioner</span>
                        <span className="mx-1">|</span>
                        <span>Cloud Analyst</span>
                        <span className="mx-1">|</span>
                        <span>Cloud Engineer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
