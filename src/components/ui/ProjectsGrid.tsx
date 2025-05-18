import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaTerminal } from 'react-icons/fa';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  details: string[];
  links?: {
    github?: string;
    demo?: string;
    case_study?: string;
  };
  onSelect?: (id: number) => void;
  isSelected?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  technologies,
  category,
  details,
  links,
  onSelect,
  isSelected = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (onSelect) {
      onSelect(id);
    }
  };
  
  // Get category icon
  const getCategoryIcon = () => {
    switch (category.toLowerCase()) {
      case 'cloud deployment':
        return <FaServer />;
      case 'infrastructure as code':
        return <FaCode />;
      case 'cloud migration':
        return <FaServer />;
      case 'hybrid cloud':
        return <FaServer />;
      case 'personal project':
        return <FaTerminal />;
      default:
        return <FaCode />;
    }
  };
  
  return (
    <motion.div
      className={`glass-card overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-terminal-purple' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -10,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-terminal-gray to-terminal-black group">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl text-terminal-white/30">{getCategoryIcon()}</span>
          </div>
        )}
        
        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-terminal-black to-transparent opacity-60"
          animate={{ opacity: isHovered ? 0.8 : 0.6 }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-terminal-black/80 text-terminal-white text-xs px-2 py-1 rounded font-mono flex items-center">
          <span className="mr-1">{getCategoryIcon()}</span>
          {category}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 text-terminal-white group-hover:text-terminal-purple transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-terminal-white/80 mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 4).map((tech, index) => (
            <span 
              key={index}
              className="text-xs bg-terminal-black/40 text-terminal-white px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {technologies.length > 4 && (
            <span className="text-xs bg-terminal-black/20 text-terminal-white px-2 py-1 rounded-full">
              +{technologies.length - 4}
            </span>
          )}
        </div>
        
        {/* Links - Only shown when hovered or selected */}
        <motion.div
          className="flex space-x-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered || isSelected ? 1 : 0, y: isHovered || isSelected ? 0 : 10 }}
          transition={{ duration: 0.2 }}
        >
          {links?.github && (
            <a 
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-white hover:text-terminal-purple transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub size={18} />
            </a>
          )}
          
          {links?.demo && (
            <a 
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-white hover:text-terminal-purple transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt size={16} />
            </a>
          )}
          
          {/* Terminal-style "View Details" button */}
          <button 
            className="text-xs font-mono text-terminal-green hover:underline flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(id);
            }}
          >
            <span className="mr-1">$</span> view-details
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface ProjectsGridProps {
  projects: ProjectCardProps[];
  className?: string;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, className = '' }) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const handleProjectSelect = (id: number) => {
    setSelectedProject(id === selectedProject ? null : id);
  };
  
  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onSelect={handleProjectSelect}
            isSelected={selectedProject === project.id}
          />
        ))}
      </div>
      
      {/* Project Details Terminal Window */}
      {selectedProject !== null && (
        <motion.div
          className="mt-8 terminal-window"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center p-2 bg-terminal-gray">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
              <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
            </div>
            <div className="mx-auto text-sm text-terminal-white font-mono">
              project-details.sh
            </div>
          </div>
          
          <div className="p-4 font-mono text-sm">
            <div className="mb-4">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-white">show-project --id {selectedProject}</span>
            </div>
            
            {projects.filter(p => p.id === selectedProject).map(project => (
              <div key={project.id}>
                <p className="text-terminal-yellow">title: {project.title}</p>
                <p className="text-terminal-yellow">category: {project.category}</p>
                <p className="text-terminal-yellow">description: {project.description}</p>
                
                <p className="text-terminal-yellow mt-2">technologies:</p>
                {project.technologies.map((tech, i) => (
                  <p key={i} className="text-terminal-green ml-4">- {tech}</p>
                ))}
                
                <p className="text-terminal-yellow mt-2">details:</p>
                {project.details.map((detail, i) => (
                  <p key={i} className="text-terminal-green ml-4">- {detail}</p>
                ))}
                
                {project.links && (
                  <div className="mt-4 flex space-x-4">
                    {project.links.github && (
                      <a 
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-pink hover:underline flex items-center"
                      >
                        <FaGithub className="mr-1" /> GitHub
                      </a>
                    )}
                    
                    {project.links.demo && (
                      <a 
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-terminal-cyan hover:underline flex items-center"
                      >
                        <FaExternalLinkAlt className="mr-1" /> Live Demo
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProjectsGrid;