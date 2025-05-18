import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

interface SkillBarProps {
  name: string;
  level: number;
  color: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const SkillBar: React.FC<SkillBarProps> = ({ 
  name, 
  level, 
  color = 'terminal-purple',
  icon,
  onClick
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div 
      className="mb-4 cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center">
          {icon && <span className={`text-${color} mr-2`}>{icon}</span>}
          <span className="font-mono font-medium">{name}</span>
        </div>
        <div className="flex items-center">
          <span className={`text-${color} text-sm font-mono`}>{level}%</span>
          {hovered && (
            <span className={`ml-2 text-xs bg-${color}/20 text-${color} px-2 py-0.5 rounded-full`}>
              {getSkillLevel(level)}
            </span>
          )}
        </div>
      </div>
      
      <div className="relative h-2 w-full bg-terminal-black/50 rounded-full overflow-hidden">
        <motion.div
          className={`absolute h-full bg-${color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

// Helper function to get skill level text based on percentage
const getSkillLevel = (level: number): string => {
  if (level >= 90) return 'Expert';
  if (level >= 80) return 'Advanced';
  if (level >= 70) return 'Proficient';
  if (level >= 50) return 'Intermediate';
  return 'Beginner';
};

interface SkillCategoryProps {
  title: string;
  skills: SkillBarProps[];
  color?: string;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({ 
  title, 
  skills,
  color = 'terminal-cyan'
}) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <FaTerminal className={`text-${color} mr-2`} />
        <h3 className={`text-${color} text-xl font-bold`}>{title}</h3>
      </div>
      
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <SkillBar
            key={index}
            name={skill.name}
            level={skill.level}
            color={skill.color || color}
            icon={skill.icon}
            onClick={skill.onClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

interface SkillsVisualizationProps {
  skillCategories: SkillCategoryProps[];
  className?: string;
}

const SkillsVisualization: React.FC<SkillsVisualizationProps> = ({ 
  skillCategories,
  className = ''
}) => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  
  const handleSkillClick = (skillName: string) => {
    setSelectedSkill(skillName);
    // You could add additional functionality here, like showing more detailed info
  };
  
  // Prepare skills with click handler
  const preparedCategories = skillCategories.map(category => ({
    ...category,
    skills: category.skills.map(skill => ({
      ...skill,
      onClick: () => handleSkillClick(skill.name)
    }))
  }));
  
  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {preparedCategories.map((category, index) => (
          <SkillCategory
            key={index}
            title={category.title}
            skills={category.skills}
            color={category.color}
          />
        ))}
      </div>
      
      {/* Optional: Terminal-themed skill details section */}
      {selectedSkill && (
        <motion.div 
          className="mt-8 p-4 bg-terminal-black border border-terminal-gray rounded-md font-mono"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center">
            <span className="text-terminal-green">$</span>
            <span className="text-terminal-white ml-2">skill --info {selectedSkill}</span>
          </div>
          <div className="mt-2 text-terminal-white">
            {/* This is where you would display more information about the selected skill */}
            <p>Detailed information about {selectedSkill} would be shown here.</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillsVisualization;