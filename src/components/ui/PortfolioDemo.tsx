import { useState, useEffect } from 'react';
import { FaTerminal, FaCloud, FaServer, FaCode } from 'react-icons/fa';

export default function PortfolioDemo() {
  const [activeTab, setActiveTab] = useState('terminal');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandOutput, setCommandOutput] = useState<JSX.Element | null>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [demoMode, setDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);

  // Toggle cursor blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  // Demo mode sequence
  useEffect(() => {
    if (!demoMode) return;
    
    const demoCommands = [
      'help',
      'about',
      'skills',
      'cd projects',
      'show-project 1',
      'certifications',
      'contact'
    ];
    
    if (demoStep >= demoCommands.length) {
      setDemoMode(false);
      setDemoStep(0);
      return;
    }
    
    // Type out each command
    let currentDemoCommand = demoCommands[demoStep];
    let charIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (charIndex <= currentDemoCommand.length) {
        setCurrentCommand(currentDemoCommand.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        
        // Execute command after typing
        setTimeout(() => {
          executeCommand(currentDemoCommand);
          
          // Move to next command
          setTimeout(() => {
            setDemoStep(prev => prev + 1);
          }, 2000);
        }, 500);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, [demoMode, demoStep]);

  // Process command
  const executeCommand = (command: string) => {
    // Add to history
    setCommandHistory(prev => [...prev, command]);
    setCurrentCommand('');
    
    // Process command and set output
    switch (command.toLowerCase()) {
      case 'help':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-yellow">Available commands:</p>
            <ul className="ml-4 mt-1">
              <li><span className="text-terminal-green">about</span> - Learn about Saurav Singh</li>
              <li><span className="text-terminal-green">skills</span> - View technical skills</li>
              <li><span className="text-terminal-green">experience</span> - View work experience</li>
              <li><span className="text-terminal-green">certifications</span> - View professional certifications</li>
              <li><span className="text-terminal-green">projects</span> - View portfolio projects</li>
              <li><span className="text-terminal-green">contact</span> - Get contact information</li>
              <li><span className="text-terminal-green">clear</span> - Clear the terminal</li>
              <li><span className="text-terminal-green">ls</span> - List sections</li>
              <li><span className="text-terminal-green">cd [section]</span> - Navigate to a section</li>
            </ul>
          </div>
        );
        break;
      
      case 'about':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-cyan font-bold">Saurav Singh</p>
            <p className="text-terminal-white">Cloud Engineer with 3+ years of experience in AWS, GCP, Azure, and OCI.</p>
            <p className="text-terminal-white">Automation enthusiast with strong communication skills and a special knack for creating innovative solutions.</p>
            <p className="text-terminal-white mt-2">Based in Bengaluru/Gurugram, India</p>
          </div>
        );
        break;
      
      case 'skills':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-yellow">Technical Skills:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              <div>
                <p className="text-terminal-cyan">Cloud Platforms:</p>
                <ul className="ml-4">
                  <li className="text-terminal-white">AWS, GCP, Azure, OCI</li>
                </ul>
              </div>
              <div>
                <p className="text-terminal-cyan">DevOps:</p>
                <ul className="ml-4">
                  <li className="text-terminal-white">Kubernetes, Docker</li>
                  <li className="text-terminal-white">Jenkins, GitHub Actions</li>
                </ul>
              </div>
              <div>
                <p className="text-terminal-cyan">IaC:</p>
                <ul className="ml-4">
                  <li className="text-terminal-white">Terraform, CloudFormation</li>
                  <li className="text-terminal-white">Ansible</li>
                </ul>
              </div>
              <div>
                <p className="text-terminal-cyan">Languages:</p>
                <ul className="ml-4">
                  <li className="text-terminal-white">Python, Shell Scripting</li>
                </ul>
              </div>
            </div>
            
            {/* Skill bars */}
            <div className="mt-4 space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-terminal-white">AWS</span>
                  <span className="text-terminal-white">90%</span>
                </div>
                <div className="h-2 bg-terminal-black rounded-full">
                  <div className="h-full bg-aws rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-terminal-white">GCP</span>
                  <span className="text-terminal-white">95%</span>
                </div>
                <div className="h-2 bg-terminal-black rounded-full">
                  <div className="h-full bg-gcp rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-terminal-white">Terraform</span>
                  <span className="text-terminal-white">95%</span>
                </div>
                <div className="h-2 bg-terminal-black rounded-full">
                  <div className="h-full bg-terminal-purple rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      
      case 'cd projects':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-green">Navigating to projects section...</p>
            <p className="text-terminal-white mt-2">Projects section loaded. Use <span className="text-terminal-green">show-project [id]</span> to view project details.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border border-terminal-gray/30 p-3 rounded-md bg-terminal-black/30">
                <span className="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 rounded-full">ID: 1</span>
                <p className="text-terminal-cyan mt-2 font-bold">GCP Marketplace App Deployment</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">GCP</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Terraform</span>
                </div>
              </div>
              <div className="border border-terminal-gray/30 p-3 rounded-md bg-terminal-black/30">
                <span className="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 rounded-full">ID: 2</span>
                <p className="text-terminal-cyan mt-2 font-bold">Multi-Cloud Infrastructure as Code</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">AWS</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Terraform</span>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      
      case 'show-project 1':
        setCommandOutput(
          <div className="mt-2">
            <div className="flex justify-between">
              <h3 className="text-terminal-purple font-bold text-lg">GCP Marketplace Application Deployment</h3>
              <span className="text-xs bg-terminal-gray/30 text-terminal-white px-2 py-1 rounded">Cloud Deployment</span>
            </div>
            
            <p className="text-terminal-white mt-3">
              Deployed VM and SAAS-based application to GCP Marketplace, making it available for enterprise customers.
            </p>
            
            <div className="mt-4">
              <p className="text-terminal-yellow">Technologies:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-xs bg-terminal-black/50 text-terminal-white px-2 py-1 rounded">GCP</span>
                <span className="text-xs bg-terminal-black/50 text-terminal-white px-2 py-1 rounded">Terraform</span>
                <span className="text-xs bg-terminal-black/50 text-terminal-white px-2 py-1 rounded">Docker</span>
                <span className="text-xs bg-terminal-black/50 text-terminal-white px-2 py-1 rounded">Kubernetes</span>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-terminal-yellow">Details:</p>
              <ul className="ml-4 mt-1">
                <li className="text-terminal-green">• Configured VM and container-based application deployments</li>
                <li className="text-terminal-green">• Set up Marketplace integration for seamless customer deployment</li>
                <li className="text-terminal-green">• Implemented automated testing and verification</li>
                <li className="text-terminal-green">• Developed documentation for end-users</li>
              </ul>
            </div>
          </div>
        );
        break;
      
      case 'certifications':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Professional Certifications:</p>
            
            <div className="mt-4">
              <p className="text-terminal-purple">Google Cloud Certifications:</p>
              <ul className="ml-4 text-terminal-white">
                <li>✓ Professional Cloud Network Engineer</li>
                <li>✓ Professional Cloud Security Engineer</li>
                <li>✓ Professional Cloud DevOps Engineer</li>
                <li>✓ Professional Cloud Architect</li>
                <li>✓ Associate Cloud Engineer</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-aws">AWS Certifications:</p>
              <ul className="ml-4 text-terminal-white">
                <li>✓ AWS Certified Solutions Architect - Associate</li>
                <li>✓ AWS Certified Cloud Practitioner</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-azure">Microsoft Certification:</p>
              <ul className="ml-4 text-terminal-white">
                <li>✓ Azure Fundamentals (AZ-900)</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-terminal-red">Oracle Certification:</p>
              <ul className="ml-4 text-terminal-white">
                <li>✓ Oracle Cloud Infrastructure Foundations Associate</li>
              </ul>
            </div>
          </div>
        );
        break;
      
      case 'contact':
        setCommandOutput(
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Contact Information:</p>
            <ul className="ml-4 mt-1">
              <li><span className="text-terminal-green">Email:</span> singhsaurav400@gmail.com</li>
              <li><span className="text-terminal-green">Phone:</span> +91-9899123603</li>
              <li><span className="text-terminal-green">Website:</span> www.sauravsingh.tech</li>
              <li><span className="text-terminal-green">GitHub:</span> github.com/sauravinside</li>
              <li><span className="text-terminal-green">LinkedIn:</span> linkedin.com/in/saurav-singh-81321b16a</li>
            </ul>
            <p className="mt-2 text-terminal-blue">Feel free to reach out for collaborations or opportunities!</p>
          </div>
        );
        break;
      
      case 'clear':
        setCommandHistory([]);
        setCommandOutput(null);
        break;
      
      default:
        if (command.startsWith('cd ')) {
          const section = command.substring(3).toLowerCase();
          const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
          
          if (validSections.includes(section)) {
            setCommandOutput(
              <p className="mt-2 text-terminal-green">
                Navigating to {section} section...
              </p>
            );
          } else {
            setCommandOutput(
              <p className="mt-2 text-terminal-red">
                Error: Section '{section}' not found. Type <span className="text-terminal-green">ls</span> to see available sections.
              </p>
            );
          }
        } else {
          setCommandOutput(
            <p className="mt-2 text-terminal-red">
              Command not found: {command}. Type <span className="text-terminal-green">help</span> for available commands.
            </p>
          );
        }
    }
  };

  // Handle command input
  const handleCommandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  // Handle command submission
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;
    
    executeCommand(currentCommand.trim());
  };

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    // Reset terminal state when switching back to terminal tab
    if (tab === 'terminal') {
      setCommandHistory([]);
      setCommandOutput(null);
      setCurrentCommand('');
    }
  };

  // Start demo mode
  const startDemo = () => {
    setDemoMode(true);
    setCommandHistory([]);
    setCommandOutput(null);
    setCurrentCommand('');
  };

  return (
    <div className="bg-terminal-black rounded-xl overflow-hidden border border-terminal-gray shadow-lg">
      {/* Tab Navigation */}
      <div className="flex bg-terminal-gray text-sm">
        <button 
          className={`px-4 py-2 flex items-center ${activeTab === 'terminal' ? 'bg-terminal-black text-terminal-green' : 'text-terminal-white hover:bg-terminal-gray/70'}`}
          onClick={() => handleTabClick('terminal')}
        >
          <FaTerminal className="mr-2" /> Terminal
        </button>
        <button 
          className={`px-4 py-2 flex items-center ${activeTab === 'cloud' ? 'bg-terminal-black text-terminal-cyan' : 'text-terminal-white hover:bg-terminal-gray/70'}`}
          onClick={() => handleTabClick('cloud')}
        >
          <FaCloud className="mr-2" /> Cloud View
        </button>
        <button 
          className={`px-4 py-2 flex items-center ${activeTab === 'projects' ? 'bg-terminal-black text-terminal-purple' : 'text-terminal-white hover:bg-terminal-gray/70'}`}
          onClick={() => handleTabClick('projects')}
        >
          <FaCode className="mr-2" /> Projects
        </button>
        
        <div className="ml-auto">
          <button 
            className="px-4 py-2 text-terminal-green hover:bg-terminal-gray/70 flex items-center"
            onClick={startDemo}
            disabled={demoMode}
          >
            <span className="mr-2">▶</span> 
            Run Demo
          </button>
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="min-h-[400px] p-4 font-mono text-sm">
        {activeTab === 'terminal' && (
          <div>
            <div className="mb-4">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-white">./welcome.sh</span>
            </div>
            
            <p className="text-terminal-white mb-4">
              Welcome to <span className="text-terminal-purple">Saurav Singh</span>'s interactive portfolio terminal. 
              Type <span className="text-terminal-green">help</span> to see available commands, or click "Run Demo" to see a demonstration.
            </p>
            
            {/* Command History */}
            {commandHistory.map((cmd, index) => (
              <div key={index} className="mb-4">
                <div className="flex">
                  <span className="text-terminal-green">$ </span>
                  <span className="text-terminal-white ml-1">{cmd}</span>
                </div>
                {index === commandHistory.length - 1 && commandOutput}
              </div>
            ))}
            
            {/* Current Command Input */}
            <form onSubmit={handleCommandSubmit} className="flex items-center">
              <span className="text-terminal-green">$ </span>
              <input
                type="text"
                value={currentCommand}
                onChange={handleCommandChange}
                className="flex-1 ml-1 bg-transparent text-terminal-white outline-none border-none font-mono"
                disabled={demoMode}
                autoFocus
              />
              {showCursor && <span className="h-4 w-2 bg-terminal-green"></span>}
            </form>
          </div>
        )}
        
        {activeTab === 'cloud' && (
          <div className="flex flex-col items-center justify-center h-[400px]">
            <div className="text-center mb-6">
              <FaCloud className="text-4xl text-terminal-cyan mx-auto mb-2" />
              <h3 className="text-xl text-terminal-white font-bold">Cloud Infrastructure View</h3>
              <p className="text-terminal-gray">A 3D visualization would appear here</p>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-aws/20 flex items-center justify-center">
                  <span className="text-aws font-bold">AWS</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gcp/20 flex items-center justify-center">
                  <span className="text-gcp font-bold">GCP</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-azure/20 flex items-center justify-center">
                  <span className="text-azure font-bold">Azure</span>
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-terminal-red/20 flex items-center justify-center">
                  <span className="text-terminal-red font-bold">OCI</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8 p-4 bg-terminal-black/50 rounded-md border border-terminal-gray/30 max-w-md">
              <p className="text-terminal-white">
                The full portfolio features an interactive 3D visualization of cloud infrastructure components built with Three.js and React Three Fiber.
              </p>
            </div>
          </div>
        )}
        
        {activeTab === 'projects' && (
          <div className="h-[400px]">
            <h3 className="text-xl text-terminal-purple font-bold mb-4">Featured Projects</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-terminal-gray/30 p-4 rounded-md bg-terminal-black/30 hover:bg-terminal-black/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-terminal-cyan/20 text-terminal-cyan px-2 py-1 rounded-full">Cloud Deployment</span>
                </div>
                <h3 className="text-lg font-bold text-terminal-white mb-2">GCP Marketplace Application Deployment</h3>
                <p className="text-sm text-terminal-gray mb-3">
                  Deployed VM and SAAS-based application to GCP Marketplace for enterprise customers.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">GCP</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Terraform</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Docker</span>
                </div>
              </div>
              
              <div className="border border-terminal-gray/30 p-4 rounded-md bg-terminal-black/30 hover:bg-terminal-black/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-terminal-purple/20 text-terminal-purple px-2 py-1 rounded-full">Infrastructure as Code</span>
                </div>
                <h3 className="text-lg font-bold text-terminal-white mb-2">Multi-Cloud Infrastructure as Code</h3>
                <p className="text-sm text-terminal-gray mb-3">
                  Terraformisation of pre-existing development and production projects.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">AWS</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">GCP</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Terraform</span>
                </div>
              </div>
              
              <div className="border border-terminal-gray/30 p-4 rounded-md bg-terminal-black/30 hover:bg-terminal-black/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-terminal-green/20 text-terminal-green px-2 py-1 rounded-full">Cloud Migration</span>
                </div>
                <h3 className="text-lg font-bold text-terminal-white mb-2">Cloud Migration Projects</h3>
                <p className="text-sm text-terminal-gray mb-3">
                  Migrated applications from Azure to GCP and AWS to GCP with minimal downtime.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">GCP</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">AWS</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Azure</span>
                </div>
              </div>
              
              <div className="border border-terminal-gray/30 p-4 rounded-md bg-terminal-black/30 hover:bg-terminal-black/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs bg-terminal-pink/20 text-terminal-pink px-2 py-1 rounded-full">Hybrid Cloud</span>
                </div>
                <h3 className="text-lg font-bold text-terminal-white mb-2">Anthos Hybrid Cloud Implementation</h3>
                <p className="text-sm text-terminal-gray mb-3">
                  Centrally managed Kubernetes clusters on hybrid cloud model via Anthos.
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">GCP</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Anthos</span>
                  <span className="text-xs bg-terminal-black/50 text-terminal-white px-1 py-0.5 rounded">Kubernetes</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center text-terminal-white">
              <p>Type <span className="text-terminal-green">cd projects</span> in the terminal tab to explore more projects</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}