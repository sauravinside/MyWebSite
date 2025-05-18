import React from 'react';
import { motion } from 'framer-motion';
import { FaAws, FaGoogle, FaDocker, FaPython, FaLinux } from 'react-icons/fa';
import { SiTerraform, SiKubernetes } from 'react-icons/si';

interface Technology {
  name: string;
  icon: React.ElementType;
  color?: string;
}

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: Technology[];
}

interface TimelineItemProps {
  experience: Experience;
  isLeft: boolean;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ experience, isLeft, index }) => {
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
                const Icon = tech.icon;
                const color = tech.color || 'terminal-blue';
                
                return (
                  <div 
                    key={i} 
                    className={`px-2 py-1 rounded bg-${color}/10 text-${color} text-xs flex items-center`}
                  >
                    <Icon className="mr-1" size={12} />
                    {tech.name}
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

interface TimelineProps {
  experiences: Experience[];
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ experiences, className = '' }) => {
  return (
    <div className={`relative py-8 ${className}`}>
      {/* Central timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-terminal-pink to-terminal-purple rounded"></div>
      
      {/* Timeline nodes */}
      {experiences.map((experience, index) => (
        <React.Fragment key={experience.id}>
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
        </React.Fragment>
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
              Total Experience: {calculateTotalExperience(experiences)} years
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
  );
};

// Helper function to calculate total experience in years
const calculateTotalExperience = (experiences: Experience[]): string => {
  // This is just a placeholder function
  // In a real implementation, you would calculate the actual years based on the dates
  return '3+';
};

export default Timeline;