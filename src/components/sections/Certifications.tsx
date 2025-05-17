'use client';

// src/components/sections/Certifications.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from '../animations/TextReveal';

// Certification data
const certifications = [
  {
    id: 1,
    name: 'Professional Cloud Network Engineer',
    provider: 'Google Cloud',
    issueDate: 'May 2023',
    expiryDate: 'May 2025',
    credentialId: '73263053',
    color: 'gcp',
    icon: '/images/certifications/gcp.png',
    description: 'Validates expertise in implementing Google Cloud networking, including VPC networks, hybrid connectivity, network services, and security.'
  },
  {
    id: 2,
    name: 'Professional Cloud Security Engineer',
    provider: 'Google Cloud',
    issueDate: 'Apr 2023',
    expiryDate: 'Apr 2025',
    credentialId: '72428931',
    color: 'gcp',
    icon: '/images/certifications/gcp.png',
    description: 'Certifies ability to design and implement secure infrastructure on Google Cloud, configure access controls, and set up network security defenses.'
  },
  {
    id: 3,
    name: 'Professional Cloud DevOps Engineer',
    provider: 'Google Cloud',
    issueDate: 'Jan 2023',
    expiryDate: 'Jan 2025',
    credentialId: '65622763',
    color: 'gcp',
    icon: '/images/certifications/gcp.png',
    description: 'Validates skills in implementing and managing continuous delivery pipelines and optimizing service performance on Google Cloud.'
  },
  {
    id: 4,
    name: 'Professional Cloud Architect',
    provider: 'Google Cloud',
    issueDate: 'Dec 2022',
    expiryDate: 'Dec 2024',
    credentialId: '64890290',
    color: 'gcp',
    icon: '/images/certifications/gcp.png',
    description: 'Certifies ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions on Google Cloud.'
  },
  {
    id: 5,
    name: 'Associate Cloud Engineer',
    provider: 'Google Cloud',
    issueDate: 'Sep 2022',
    expiryDate: 'Sep 2024',
    credentialId: '58258492',
    color: 'gcp',
    icon: '/images/certifications/gcp.png',
    description: 'Validates skills in deploying applications, monitoring operations, and managing enterprise solutions on Google Cloud.'
  },
  {
    id: 6,
    name: 'AWS Certified Solutions Architect - Associate',
    provider: 'Amazon Web Services',
    issueDate: 'Dec 2023',
    expiryDate: 'Dec 2026',
    credentialId: 'RQX6G5FDYF44QSG1',
    color: 'aws',
    icon: '/images/certifications/aws.png',
    description: 'Validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.'
  },
  {
    id: 7,
    name: 'AWS Certified Cloud Practitioner',
    provider: 'Amazon Web Services',
    issueDate: 'Sep 2022',
    expiryDate: 'Sep 2025',
    credentialId: 'QKZZC01CZ1FE1MGR',
    color: 'aws',
    icon: '/images/certifications/aws.png',
    description: 'Validates cloud fluency and foundational knowledge of AWS cloud services, architecture, security, and compliance.'
  },
  {
    id: 8,
    name: 'Microsoft Certified: Azure Fundamentals',
    provider: 'Microsoft',
    issueDate: 'Apr 2022',
    expiryDate: 'N/A (Does not expire)',
    credentialId: 'N/A',
    color: 'azure',
    icon: '/images/certifications/azure.png',
    description: 'Validates foundational knowledge of cloud concepts and Azure services, including security, privacy, compliance, and pricing.'
  },
  {
    id: 9,
    name: 'Oracle Cloud Infrastructure Foundations Associate',
    provider: 'Oracle',
    issueDate: 'Feb 2022',
    expiryDate: 'N/A (Does not expire)',
    credentialId: 'nd152689qT11W',
    color: 'terminal-red',
    icon: '/images/certifications/oracle.png',
    description: 'Validates foundational knowledge of Oracle Cloud Infrastructure services, including compute, storage, and networking concepts.'
  }
];

// Group certifications by provider
const groupedCertifications = {
  'Google Cloud': certifications.filter(cert => cert.provider === 'Google Cloud'),
  'Amazon Web Services': certifications.filter(cert => cert.provider === 'Amazon Web Services'),
  'Microsoft': certifications.filter(cert => cert.provider === 'Microsoft'),
  'Oracle': certifications.filter(cert => cert.provider === 'Oracle')
};

export default function Certifications() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  return (
    <section 
      id="certifications" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Subtle cloud-like background */}
      <div className="absolute inset-0 bg-terminal-black z-0"></div>
      <div className="absolute inset-0 opacity-10 z-0" style={{ 
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)',
        backgroundSize: '100% 100%'
      }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Professional Certifications</h2>
          </TextReveal>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 space-y-16"
          >
            {Object.entries(groupedCertifications).map(([provider, certs], providerIndex) => (
              <div key={provider}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: providerIndex * 0.1 }}
                  viewport={{ once: true }}
                  className={`text-2xl font-bold mb-8 text-${certs[0].color}`}
                >
                  {provider}
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certs.map((cert, certIndex) => (
                    <motion.div
                      key={cert.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: (providerIndex * 0.1) + (certIndex * 0.05) }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: `0 0 20px rgba(0, 0, 0, 0.3), 0 0 10px var(--color-${cert.color})`
                      }}
                      className={`glass-card p-6 border-t-4 border-${cert.color} relative group`}
                    >
                      {/* Certification icon */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-full bg-${cert.color}/20 flex items-center justify-center`}>
                          <div className="w-8 h-8 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url(${cert.icon})` }}></div>
                        </div>
                        
                        {/* Status indicator */}
                        <div className="flex items-center">
                          <span className="w-2 h-2 rounded-full bg-terminal-green mr-2"></span>
                          <span className="text-xs text-terminal-green font-mono">Active</span>
                        </div>
                      </div>
                      
                      <h4 className="text-lg font-bold mb-1">{cert.name}</h4>
                      
                      <div className="text-sm text-terminal-gray mb-4">
                        <div>ID: {cert.credentialId}</div>
                        <div>Issued: {cert.issueDate}</div>
                        <div>Expires: {cert.expiryDate}</div>
                      </div>
                      
                      <p className="text-sm text-terminal-white opacity-80 mt-4">
                        {cert.description}
                      </p>
                      
                      {/* Hover effect reveal */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-terminal-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Interactive certificate display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <h3 className="text-2xl font-bold text-terminal-purple mb-6">Certification Timeline</h3>
            
            <div className="relative max-w-4xl mx-auto py-10">
              {/* Timeline line */}
              <div className="absolute h-1 bg-gradient-to-r from-terminal-blue via-terminal-purple to-terminal-pink w-full top-1/2 transform -translate-y-1/2"></div>
              
              {/* Year markers */}
              {['2022', '2023', '2024', '2025', '2026'].map((year, index) => (
                <div key={year} className="absolute" style={{ left: `${index * 25}%` }}>
                  <div className="w-1 h-4 bg-terminal-gray absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm text-terminal-gray font-mono">
                    {year}
                  </div>
                </div>
              ))}
              
              {/* Certificate markers */}
              {certifications.map((cert, index) => {
                // Calculate position based on issue date
                const yearMonth = cert.issueDate.split(' ');
                const year = parseInt(yearMonth[1]);
                const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(yearMonth[0]) / 12;
                
                // Position on timeline (2022-2026 range, 5 years)
                const position = ((year - 2022) + month) / 4 * 100;
                
                return (
                  <motion.div
                    key={cert.id}
                    className="absolute top-1/2 transform -translate-y-1/2"
                    style={{ left: `${position}%` }}
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={`w-5 h-5 rounded-full bg-${cert.color} border-2 border-terminal-black`}></div>
                    <div className={`hidden absolute bottom-full mb-2 p-2 rounded bg-${cert.color}/20 text-white text-xs whitespace-nowrap transform -translate-x-1/2 left-1/2 group-hover:block`}>
                      {cert.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}