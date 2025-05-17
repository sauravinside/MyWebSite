'use client';

// src/components/sections/Projects.tsx
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTerminal } from 'react-icons/fa';
import TextReveal from '../animations/TextReveal';

// Project data
const projects = [
  {
    id: 1,
    title: "GCP Marketplace Application Deployment",
    description: "Deployed VM and SAAS-based application to GCP Marketplace, making it available for enterprise customers.",
    image: "/images/projects/gcp-marketplace.png",
    technologies: ["GCP", "Terraform", "Docker", "Kubernetes"],
    category: "Cloud Deployment",
    details: [
      "Configured VM and container-based application deployments",
      "Set up Marketplace integration for seamless customer deployment",
      "Implemented automated testing and verification",
      "Developed documentation for end-users"
    ]
  },
  {
    id: 2,
    title: "Multi-Cloud Infrastructure as Code",
    description: "Terraformisation of pre-existing development and production projects for consistent infrastructure management.",
    image: "/images/projects/terraform.png",
    technologies: ["Terraform", "AWS", "GCP", "Azure"],
    category: "Infrastructure as Code",
    details: [
      "Converted existing manually-managed infrastructure to Terraform",
      "Created modular and reusable Terraform components",
      "Implemented CI/CD for infrastructure deployment",
      "Established state management and version control"
    ]
  },
  {
    id: 3,
    title: "Cloud Migration Projects",
    description: "Migrated applications and infrastructure from Azure to GCP and AWS to GCP with minimal downtime.",
    image: "/images/projects/cloud-migration.png",
    technologies: ["GCP", "AWS", "Azure", "Terraform"],
    category: "Cloud Migration",
    details: [
      "Developed migration strategy and architecture",
      "Implemented parallel environments for testing",
      "Managed data transfer and synchronization",
      "Executed cutover with minimal service disruption"
    ]
  },
  {
    id: 4,
    title: "Anthos Hybrid Cloud Implementation",
    description: "Centrally managed Kubernetes clusters on hybrid cloud model via Anthos for a unified management experience.",
    image: "/images/projects/anthos.png",
    technologies: ["GCP", "Anthos", "Kubernetes", "Terraform"],
    category: "Hybrid Cloud",
    details: [
      "Configured Anthos for multi-cloud Kubernetes management",
      "Set up hybrid connectivity and security policies",
      "Implemented centralized logging and monitoring",
      "Created consistent deployment pipelines"
    ]
  },
  {
    id: 5,
    title: "Employee Database Web Application",
    description: "Built a web application with backend for uploading images to S3 and using RDS for main database with DynamoDB for metadata.",
    image: "/images/projects/employee-db.png",
    technologies: ["AWS", "S3", "RDS", "DynamoDB", "Python", "Flask"],
    category: "Personal Project",
    details: [
      "Designed and implemented a scalable application architecture",
      "Created Python backend with Flask API",
      "Integrated AWS services (S3, RDS, DynamoDB)",
      "Developed image upload and processing functionality"
    ]
  },
  {
    id: 6,
    title: "Three-Tier Architecture Deployment",
    description: "Created a three-tier architecture (Web, App, and DB) using CloudFormation for automated deployment.",
    image: "/images/projects/three-tier.png",
    technologies: ["AWS", "CloudFormation", "EC2", "RDS"],
    category: "Personal Project",
    details: [
      "Designed scalable three-tier application architecture",
      "Created CloudFormation templates for infrastructure",
      "Implemented load balancing and auto-scaling",
      "Set up database replication and backups"
    ]
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-terminal-black opacity-90 z-0"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-background z-0 opacity-20"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Featured Projects</h2>
          </TextReveal>
          
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="glass-card group cursor-pointer overflow-hidden"
                  onClick={() => setActiveProject(project.id)}
                >
                  {/* Project image placeholder (using a gradient as fallback) */}
                  <div className="relative h-48 bg-gradient-to-br from-terminal-blue to-terminal-purple overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl text-white opacity-80">
                        <FaTerminal />
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono text-terminal-green">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-terminal-white mb-2 group-hover:text-terminal-purple transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-terminal-gray mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tag-cloud-item bg-terminal-black/50 text-terminal-white text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          {/* Terminal-themed project showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-20 max-w-3xl mx-auto"
          >
            <div className="terminal-window">
              <div className="flex items-center p-2 bg-terminal-gray">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
                  <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                </div>
                <div className="mx-auto text-sm text-terminal-white font-mono">
                  projects.sh
                </div>
              </div>
              
              <div className="p-4 font-mono text-sm">
                <div className="mb-4">
                  <span className="text-terminal-green">$ </span>
                  <span className="text-terminal-white">ls -la ./projects</span>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className="flex items-center cursor-pointer py-1 px-2 rounded hover:bg-terminal-gray/20"
                      onClick={() => setActiveProject(project.id)}
                    >
                      <span className="text-terminal-blue mr-4">-rw-r--r--</span>
                      <span className={`text-terminal-${project.id === activeProject ? 'pink' : 'white'}`}>
                        {project.title.toLowerCase().replace(/ /g, '-')}.yml
                      </span>
                    </div>
                  ))}
                </div>
                
                {activeProject && (
                  <>
                    <div className="mt-4">
                      <span className="text-terminal-green">$ </span>
                      <span className="text-terminal-white">
                        cat ./projects/{projects.find(p => p.id === activeProject)?.title.toLowerCase().replace(/ /g, '-')}.yml
                      </span>
                    </div>
                    
                    <div className="mt-2 p-2 rounded bg-terminal-black/30">
                      <p className="text-terminal-yellow">title: {projects.find(p => p.id === activeProject)?.title}</p>
                      <p className="text-terminal-yellow">category: {projects.find(p => p.id === activeProject)?.category}</p>
                      <p className="text-terminal-yellow">technologies:</p>
                      {projects.find(p => p.id === activeProject)?.technologies.map((tech, i) => (
                        <p key={i} className="text-terminal-green ml-4">- {tech}</p>
                      ))}
                      <p className="text-terminal-yellow">details:</p>
                      {projects.find(p => p.id === activeProject)?.details.map((detail, i) => (
                        <p key={i} className="text-terminal-green ml-4">- {detail}</p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}