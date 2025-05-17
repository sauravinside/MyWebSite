'use client';

// src/components/sections/Skills.tsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FaAws, 
  FaGoogle, 
  FaMicrosoft, 
  FaDocker, 
  FaPython, 
  FaLinux, 
  FaJenkins, 
  FaGithub, 
  FaGitlab, 
  FaDatabase
} from 'react-icons/fa';
import { 
  SiTerraform, 
  SiKubernetes, 
  SiAnsible, 
  SiOracle, 
  SiApache, 
  SiNginx, 
  SiPrometheus, 
  SiGrafana
} from 'react-icons/si';
import TextReveal from '../animations/TextReveal';

// Skill categories
const skillCategories = [
  {
    name: 'Cloud Platforms',
    skills: [
      { name: 'AWS', icon: FaAws, level: 90, color: 'aws' },
      { name: 'Google Cloud', icon: FaGoogle, level: 95, color: 'gcp' },
      { name: 'Azure', icon: FaMicrosoft, level: 80, color: 'azure' },
      { name: 'Oracle Cloud', icon: SiOracle, level: 75, color: 'terminal-red' }
    ]
  },
  {
    name: 'Infrastructure as Code',
    skills: [
      { name: 'Terraform', icon: SiTerraform, level: 95, color: 'terminal-purple' },
      { name: 'CloudFormation', icon: FaAws, level: 85, color: 'aws' },
      { name: 'Ansible', icon: SiAnsible, level: 80, color: 'terminal-red' }
    ]
  },
  {
    name: 'Containerization & Orchestration',
    skills: [
      { name: 'Docker', icon: FaDocker, level: 90, color: 'terminal-blue' },
      { name: 'Kubernetes', icon: SiKubernetes, level: 85, color: 'terminal-blue' },
      { name: 'EKS', icon: FaAws, level: 85, color: 'aws' },
      { name: 'GKE', icon: FaGoogle, level: 85, color: 'gcp' },
      { name: 'Anthos', icon: FaGoogle, level: 80, color: 'gcp' }
    ]
  },
  {
    name: 'CI/CD & DevOps',
    skills: [
      { name: 'Jenkins', icon: FaJenkins, level: 80, color: 'terminal-cyan' },
      { name: 'GitHub Actions', icon: FaGithub, level: 85, color: 'terminal-white' },
      { name: 'GitLab CI/CD', icon: FaGitlab, level: 75, color: 'terminal-orange' },
      { name: 'AWS CodePipeline', icon: FaAws, level: 80, color: 'aws' }
    ]
  },
  {
    name: 'Monitoring & Security',
    skills: [
      { name: 'Prometheus', icon: SiPrometheus, level: 85, color: 'terminal-orange' },
      { name: 'Grafana', icon: SiGrafana, level: 85, color: 'terminal-green' },
      { name: 'IAM', icon: FaAws, level: 90, color: 'aws' },
      { name: 'WAF & SIEM', icon: FaGoogle, level: 80, color: 'gcp' }
    ]
  },
  {
    name: 'Programming & Scripting',
    skills: [
      { name: 'Python', icon: FaPython, level: 90, color: 'terminal-green' },
      { name: 'Shell Scripting', icon: FaLinux, level: 85, color: 'terminal-yellow' },
      { name: 'BOTO SDK', icon: FaAws, level: 85, color: 'aws' }
    ]
  },
  {
    name: 'Web Servers & Databases',
    skills: [
      { name: 'Apache', icon: SiApache, level: 80, color: 'terminal-red' },
      { name: 'Nginx', icon: SiNginx, level: 80, color: 'terminal-green' },
      { name: 'MySQL', icon: FaDatabase, level: 85, color: 'terminal-blue' },
      { name: 'DynamoDB', icon: FaAws, level: 80, color: 'aws' },
      { name: 'RDS', icon: FaAws, level: 85, color: 'aws' }
    ]
  }
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  
  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="min-h-screen w-full py-20 relative overflow-hidden"
    >
      {/* Colorful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-terminal-black via-terminal-gray to-terminal-black z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <motion.div style={{ y }} className="max-w-6xl mx-auto">
          <TextReveal>
            <h2 className="section-heading text-center">Technical Skills</h2>
          </TextReveal>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 space-y-16"
          >
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.name}>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-terminal-cyan mb-8"
                >
                  {category.name}
                </motion.h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.03 }}
                        className="glass-card p-6"
                      >
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`text-${skill.color} text-2xl`}>
                            <Icon />
                          </div>
                          <h4 className="text-lg font-bold">{skill.name}</h4>
                        </div>
                        
                        {/* Skill level bar */}
                        <div className="relative h-2 bg-terminal-black/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 1, delay: (categoryIndex * 0.1) + (skillIndex * 0.05) + 0.3 }}
                            viewport={{ once: true }}
                            className={`absolute top-0 left-0 h-full bg-${skill.color} rounded-full`}
                          ></motion.div>
                        </div>
                        
                        {/* Proficiency label */}
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs text-terminal-white opacity-70">Proficiency</span>
                          <span className="text-xs font-mono text-terminal-white opacity-70">{skill.level}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Terminal-themed skill summary */}
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
                  skills-summary.sh
                </div>
              </div>
              
              <div className="p-4 font-mono text-sm">
                <div className="mb-4">
                  <span className="text-terminal-green">$ </span>
                  <span className="text-terminal-white">./analyze-skills.sh</span>
                </div>
                
                <p className="text-terminal-white">Analyzing skills profile for <span className="text-terminal-pink">Saurav Singh</span>...</p>
                
                <div className="mt-4 space-y-2">
                  <p className="text-terminal-green">✓ Strong proficiency in cloud platforms (AWS, GCP, Azure, OCI)</p>
                  <p className="text-terminal-green">✓ Expert in infrastructure as code with Terraform</p>
                  <p className="text-terminal-green">✓ Advanced containerization & orchestration skills</p>
                  <p className="text-terminal-green">✓ Comprehensive CI/CD pipeline implementation</p>
                  <p className="text-terminal-green">✓ Robust monitoring and security expertise</p>
                  <p className="text-terminal-green">✓ Effective automation with Python and Shell scripting</p>
                </div>
                
                <div className="mt-4 border-t border-terminal-gray pt-4">
                  <p className="text-terminal-yellow">RESULT: <span className="text-terminal-cyan">Highly qualified Cloud Engineer with comprehensive DevOps skill set</span></p>
                  <p className="text-terminal-yellow">RECOMMENDATION: <span className="text-terminal-cyan">Ideal candidate for advanced cloud infrastructure and automation projects</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}