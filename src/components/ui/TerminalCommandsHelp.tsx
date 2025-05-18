import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal, FaChevronRight, FaChevronDown } from 'react-icons/fa';

interface CommandHelpProps {
  className?: string;
}

interface CommandCategory {
  name: string;
  description: string;
  commands: Command[];
}

interface Command {
  name: string;
  description: string;
  example?: string;
  args?: string[];
}

const TerminalCommandsHelp: React.FC<CommandHelpProps> = ({ className = '' }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['navigation']);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredCategories, setFilteredCategories] = useState<CommandCategory[]>(commandCategories);
  
  // Toggle category expansion
  const toggleCategory = (categoryName: string) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(expandedCategories.filter(cat => cat !== categoryName));
    } else {
      setExpandedCategories([...expandedCategories, categoryName]);
    }
  };
  
  // Handle search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCategories(commandCategories);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    const filtered = commandCategories.map(category => {
      const filteredCommands = category.commands.filter(command => 
        command.name.toLowerCase().includes(query) || 
        command.description.toLowerCase().includes(query)
      );
      
      return {
        ...category,
        commands: filteredCommands
      };
    }).filter(category => category.commands.length > 0);
    
    setFilteredCategories(filtered);
    
    // Auto-expand categories with matches
    const matchedCategories = filtered.map(cat => cat.name);
    setExpandedCategories(matchedCategories);
  }, [searchQuery]);
  
  return (
    <div className={`terminal-window ${className}`}>
      <div className="flex items-center p-2 bg-terminal-gray">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        <div className="mx-auto text-sm text-terminal-white font-mono">
          command-help.sh
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <span className="text-terminal-green">$ </span>
          <span className="text-terminal-white">./show-commands.sh</span>
        </div>
        
        <p className="text-terminal-white mb-4">
          Welcome to Saurav Singh's portfolio! Here's a list of available terminal commands you can use to navigate and explore this site:
        </p>
        
        {/* Search bar */}
        <div className="mb-6 flex items-center bg-terminal-black/50 border border-terminal-gray rounded overflow-hidden">
          <span className="px-3 text-terminal-green">$</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-full py-2 pr-3 bg-transparent border-none outline-none text-terminal-white font-mono"
          />
        </div>
        
        {/* Command categories */}
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div key={category.name} className="border border-terminal-gray/30 rounded-md overflow-hidden">
              {/* Category header */}
              <div 
                className="flex items-center justify-between p-3 bg-terminal-gray/20 cursor-pointer"
                onClick={() => toggleCategory(category.name)}
              >
                <div className="flex items-center">
                  <FaTerminal className="text-terminal-purple mr-2" />
                  <h3 className="font-bold text-terminal-white">{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</h3>
                </div>
                <div className="text-terminal-white">
                  {expandedCategories.includes(category.name) ? <FaChevronDown /> : <FaChevronRight />}
                </div>
              </div>
              
              {/* Commands list */}
              {expandedCategories.includes(category.name) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-terminal-black/30"
                >
                  <p className="text-terminal-gray mb-3 text-sm">{category.description}</p>
                  
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b border-terminal-gray/30">
                        <th className="p-2 font-mono text-terminal-cyan">Command</th>
                        <th className="p-2 font-mono text-terminal-cyan">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.commands.map((command, index) => (
                        <tr key={command.name} className={index % 2 === 0 ? 'bg-terminal-black/10' : ''}>
                          <td className="p-2 font-mono text-terminal-green">{command.name} {command.args?.map(arg => `[${arg}]`).join(' ')}</td>
                          <td className="p-2 text-terminal-white">{command.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Example usage for this category */}
                  {category.commands.some(cmd => cmd.example) && (
                    <div className="mt-4 p-3 bg-terminal-black/50 rounded border border-terminal-gray/30">
                      <p className="text-terminal-cyan mb-2 text-sm">Example usage:</p>
                      {category.commands
                        .filter(cmd => cmd.example)
                        .map((cmd, idx) => (
                          <div key={idx} className="mb-2 last:mb-0">
                            <span className="text-terminal-green">$ </span>
                            <span className="text-terminal-white">{cmd.example}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
        
        {/* Quick reference for key commands */}
        <div className="mt-8 p-4 bg-terminal-black/30 rounded border border-terminal-gray/30">
          <h3 className="text-terminal-purple font-bold mb-2">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <span className="text-terminal-green font-mono mr-2">help</span>
              <span className="text-terminal-white">Show available commands</span>
            </div>
            <div className="flex items-center">
              <span className="text-terminal-green font-mono mr-2">about</span>
              <span className="text-terminal-white">View Saurav's profile</span>
            </div>
            <div className="flex items-center">
              <span className="text-terminal-green font-mono mr-2">cd projects</span>
              <span className="text-terminal-white">Navigate to Projects section</span>
            </div>
            <div className="flex items-center">
              <span className="text-terminal-green font-mono mr-2">skills</span>
              <span className="text-terminal-white">View technical skills</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Command categories data
const commandCategories: CommandCategory[] = [
  {
    name: 'navigation',
    description: 'Commands to navigate through different sections of the portfolio',
    commands: [
      { 
        name: 'cd', 
        description: 'Navigate to a specific section', 
        args: ['section'],
        example: 'cd projects'
      },
      { 
        name: 'ls', 
        description: 'List all available sections',
        example: 'ls'
      },
      { 
        name: 'home', 
        description: 'Go to the home page',
        example: 'home'
      }
    ]
  },
  {
    name: 'information',
    description: 'Commands to display information about Saurav Singh',
    commands: [
      { 
        name: 'about', 
        description: 'Display information about Saurav Singh',
        example: 'about'
      },
      { 
        name: 'skills', 
        description: 'List technical skills',
        example: 'skills'
      },
      { 
        name: 'experience', 
        description: 'Show work experience',
        example: 'experience'
      },
      { 
        name: 'education', 
        description: 'Display educational background',
        example: 'education'
      },
      { 
        name: 'certifications', 
        description: 'List professional certifications',
        example: 'certifications'
      },
      { 
        name: 'projects', 
        description: 'Display portfolio projects',
        example: 'projects'
      },
      { 
        name: 'contact', 
        description: 'Show contact information',
        example: 'contact'
      }
    ]
  },
  {
    name: 'utilities',
    description: 'Utility commands for the terminal interface',
    commands: [
      { 
        name: 'clear', 
        description: 'Clear the terminal screen',
        example: 'clear'
      },
      { 
        name: 'help', 
        description: 'Show available commands',
        example: 'help'
      },
      { 
        name: 'cat', 
        description: 'View content of a file', 
        args: ['file'],
        example: 'cat resume.txt'
      },
      {
        name: 'theme',
        description: 'Change terminal theme color',
        args: ['color'],
        example: 'theme blue'
      }
    ]
  },
  {
    name: 'projects',
    description: 'Commands to interact with projects section',
    commands: [
      { 
        name: 'show-project', 
        description: 'Display details of a specific project', 
        args: ['id'],
        example: 'show-project 1'
      },
      { 
        name: 'list-projects', 
        description: 'List all projects with IDs',
        example: 'list-projects'
      },
      { 
        name: 'filter-projects', 
        description: 'Filter projects by technology', 
        args: ['technology'],
        example: 'filter-projects AWS'
      }
    ]
  },
  {
    name: 'certifications',
    description: 'Commands to interact with certifications section',
    commands: [
      { 
        name: 'verify-cert', 
        description: 'Verify a specific certification', 
        args: ['id'],
        example: 'verify-cert 1'
      },
      { 
        name: 'list-certs', 
        description: 'List all certifications by provider',
        example: 'list-certs'
      }
    ]
  }
];

export default TerminalCommandsHelp;