'use client';

// src/components/terminal/Terminal.tsx
import { useState, useEffect, KeyboardEvent, useRef } from 'react';
import TerminalOutput from './TerminalOutput';
import { motion } from 'framer-motion';

// Define command history and output types
type CommandType = {
  command: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandType[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input on initial load and when clicked anywhere in terminal
  useEffect(() => {
    inputRef.current?.focus();
    
    const handleClick = () => {
      inputRef.current?.focus();
    };
    
    containerRef.current?.addEventListener('click', handleClick);
    
    return () => {
      containerRef.current?.removeEventListener('click', handleClick);
    };
  }, []);

  // Scroll to bottom when new command is added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Process command when Enter is pressed
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Navigate command history with up/down arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(input.trim());
      setInput('');
      setHistoryIndex(-1);
    }
  };

  // Command processor
  const processCommand = (cmd: string) => {
    if (!cmd) return;
    
    let output: React.ReactNode;
    
    switch (cmd.toLowerCase()) {
      case 'help':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow">Available commands:</p>
            <ul className="ml-4 mt-1">
              <li><span className="text-terminal-green">about</span> - Learn about Saurav Singh</li>
              <li><span className="text-terminal-green">skills</span> - View technical skills</li>
              <li><span className="text-terminal-green">experience</span> - View work experience</li>
              <li><span className="text-terminal-green">education</span> - View educational background</li>
              <li><span className="text-terminal-green">certifications</span> - View professional certifications</li>
              <li><span className="text-terminal-green">projects</span> - View portfolio projects</li>
              <li><span className="text-terminal-green">contact</span> - Get contact information</li>
              <li><span className="text-terminal-green">clear</span> - Clear the terminal</li>
              <li><span className="text-terminal-green">ls</span> - List sections</li>
              <li><span className="text-terminal-green">cd [section]</span> - Navigate to a section</li>
              <li><span className="text-terminal-green">cat [file]</span> - View content of a file</li>
            </ul>
            <p className="mt-2 text-terminal-blue">Try typing <span className="text-terminal-green">about</span> to get started!</p>
          </div>
        );
        break;
        
      case 'about':
        output = (
          <div className="mt-2">
            <p className="text-terminal-cyan font-bold">Saurav Singh</p>
            <p className="mt-1">Cloud Engineer with 3+ years of experience in AWS, GCP, Azure, and OCI.</p>
            <p className="mt-1">Automation enthusiast with strong communication skills and a special knack for creating innovative solutions.</p>
            <p className="mt-1">Highly certified in cloud technologies with expertise in DevOps practices, Terraform, and infrastructure as code.</p>
            <p className="mt-2 text-terminal-blue">Type <span className="text-terminal-green">skills</span> to see my technical expertise.</p>
          </div>
        );
        break;
        
      case 'skills':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow">Technical Skills:</p>
            <ul className="ml-4 mt-1">
              <li><span className="text-terminal-cyan">Cloud Platforms:</span> AWS, GCP, Azure, OCI</li>
              <li><span className="text-terminal-cyan">DevOps:</span> Jenkins, Ansible, Kubernetes, GitHub, GitLab, Bitbucket, Docker</li>
              <li><span className="text-terminal-cyan">Automation:</span> Terraform, CloudFormation, Shell scripting, Python</li>
              <li><span className="text-terminal-cyan">Web Servers & Databases:</span> Apache, Nginx, MySQL</li>
              <li><span className="text-terminal-cyan">Operating Systems:</span> Linux</li>
              <li><span className="text-terminal-cyan">Security:</span> IAM, Inspector, AWS governance tools</li>
            </ul>
            <p className="mt-2 text-terminal-blue">Type <span className="text-terminal-green">certifications</span> to see my cloud certifications.</p>
          </div>
        );
        break;
        
      case 'experience':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Work Experience:</p>
            
            <div className="mt-2">
              <p className="text-terminal-green">Searce Cosourcing Pvt Ltd (June 2022 - Present)</p>
              <p className="text-terminal-white font-bold">Cloud Engineer</p>
              <ul className="ml-4 mt-1 text-terminal-white">
                <li>• Terraform modules and CloudFormation development</li>
                <li>• Migration expertise (Azure to GCP, AWS to GCP)</li>
                <li>• Linux servers & EKS administration</li>
                <li>• Monitoring with Prometheus and Grafana</li>
                <li>• Kubernetes cluster management with Anthos</li>
                <li>• Shell/Python scripting for automation</li>
                <li>• WAF & SIEM implementation</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <p className="text-terminal-green">Intellipaat Software Solutions (June 2021 - May 2022)</p>
              <p className="text-terminal-white font-bold">Lead Cloud Analyst</p>
              <ul className="ml-4 mt-1 text-terminal-white">
                <li>• CI/CD pipeline implementation</li>
                <li>• Security best practices and AWS Governance</li>
                <li>• Linux with Apache and PHP configuration</li>
                <li>• Python automation with BOTO SDK</li>
                <li>• OpenShift and EKS implementation</li>
              </ul>
            </div>
            
            <div className="mt-3">
              <p className="text-terminal-green">Department Of Youth Capital (Jan 2021 - Jun 2021)</p>
              <p className="text-terminal-white font-bold">AWS Cloud Practitioner (Internship)</p>
              <ul className="ml-4 mt-1 text-terminal-white">
                <li>• Static website hosting on VMs and S3</li>
                <li>• Route53 DNS management</li>
                <li>• Basic cloud services implementation</li>
              </ul>
            </div>
            
            <p className="mt-2 text-terminal-blue">Type <span className="text-terminal-green">projects</span> to view my portfolio projects.</p>
          </div>
        );
        break;
        
      case 'certifications':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Professional Certifications:</p>
            
            <div className="mt-2">
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
              <p className="text-terminal-orange">AWS Certifications:</p>
              <ul className="ml-4 text-terminal-white">
                <li>✓ AWS Certified Solutions Architect - Associate</li>
                <li>✓ AWS Certified Cloud Practitioner</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-terminal-blue">Microsoft Certification:</p>
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
        
      case 'education':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Educational Background:</p>
            
            <div className="mt-2">
              <p className="text-terminal-cyan">Bachelor of Technology (B-Tech) in Computer Science</p>
              <p className="text-terminal-white">Lovely Professional University</p>
              <p className="text-terminal-white">CGPA: 7.8 (Equivalent to 80%)</p>
            </div>
            
            <div className="mt-2">
              <p className="text-terminal-cyan">Intermediate Education (2017)</p>
              <p className="text-terminal-white">Holy Convent Sr Sec School</p>
              <p className="text-terminal-white">Percentage: 92%</p>
            </div>
            
            <div className="mt-2">
              <p className="text-terminal-cyan">Matriculation Education (2015)</p>
              <p className="text-terminal-white">DAV HR Sec School</p>
              <p className="text-terminal-white">CGPA: 10.0</p>
            </div>
          </div>
        );
        break;
        
      case 'projects':
        output = (
          <div className="mt-2">
            <p className="text-terminal-yellow font-bold">Portfolio Projects:</p>
            
            <div className="mt-2">
              <p className="text-terminal-green font-bold">Cloud Deployments:</p>
              <ul className="ml-4 text-terminal-white">
                <li>• VM and SAAS-based application deployment to GCP Marketplace</li>
                <li>• Terraformisation of pre-existing development and production projects</li>
                <li>• Cloud migrations (Azure to GCP, AWS to GCP)</li>
                <li>• Anthos implementation for hybrid cloud management</li>
              </ul>
            </div>
            
            <div className="mt-2">
              <p className="text-terminal-green font-bold">Personal Projects:</p>
              <ul className="ml-4 text-terminal-white">
                <li>• Employee Database Web App with S3, RDS, DynamoDB, Python/Flask</li>
                <li>• Three-Tier Architecture (Web, App, DB) with CloudFormation</li>
                <li>• Zoom API Integration for automated report downloads</li>
                <li>• Portfolio Website with message notifications, hosted on AWS</li>
              </ul>
            </div>
            
            <p className="mt-2 text-terminal-blue">Type <span className="text-terminal-green">cd projects</span> to navigate to the projects section for more details.</p>
          </div>
        );
        break;
        
      case 'contact':
        output = (
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
        return;
        
      case 'ls':
        output = (
          <div className="mt-2">
            <p className="text-terminal-blue">Available sections:</p>
            <div className="grid grid-cols-3 gap-2 mt-1">
              <span className="text-terminal-green">home/</span>
              <span className="text-terminal-green">about/</span>
              <span className="text-terminal-green">experience/</span>
              <span className="text-terminal-green">projects/</span>
              <span className="text-terminal-green">skills/</span>
              <span className="text-terminal-green">certifications/</span>
              <span className="text-terminal-green">contact/</span>
            </div>
            <p className="mt-2 text-terminal-blue">Use <span className="text-terminal-green">cd [section]</span> to navigate.</p>
          </div>
        );
        break;
        
      default:
        // Handle cd command
        if (cmd.startsWith('cd ')) {
          const section = cmd.substring(3).toLowerCase();
          
          // List of valid sections
          const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
          
          if (validSections.includes(section)) {
            output = <p className="mt-2 text-terminal-blue">Navigating to <span className="text-terminal-green">{section}</span> section...</p>;
            
            // Smooth scroll to the section
            setTimeout(() => {
              const element = document.getElementById(section);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 500);
          } else {
            output = <p className="mt-2 text-terminal-red">Error: Section '{section}' not found. Type <span className="text-terminal-green">ls</span> to see available sections.</p>;
          }
        }
        // Handle cat command
        else if (cmd.startsWith('cat ')) {
          const file = cmd.substring(4).toLowerCase();
          
          switch (file) {
            case 'profile.txt':
              output = (
                <div className="mt-2">
                  <p className="text-terminal-yellow">=== profile.txt ===</p>
                  <p className="mt-1">Name: Saurav Singh</p>
                  <p>Role: Cloud Engineer</p>
                  <p>Location: Bengaluru/Gurugram, India</p>
                  <p>Experience: 3+ years in Cloud & DevOps</p>
                  <p>Expertise: AWS, GCP, Azure, Terraform, Kubernetes</p>
                </div>
              );
              break;
              
            case 'resume.txt':
              output = (
                <div className="mt-2">
                  <p className="text-terminal-yellow">=== resume.txt ===</p>
                  <p className="text-terminal-cyan font-bold mt-1">SUMMARY</p>
                  <p>Cloud Engineer with 3+ years of experience. Automation enthusiast with strong communication skills.</p>
                  
                  <p className="text-terminal-cyan font-bold mt-2">EXPERIENCE</p>
                  <p>- Cloud Engineer at Searce (2022-Present)</p>
                  <p>- Lead Cloud Analyst at Intellipaat (2021-2022)</p>
                  <p>- AWS Cloud Practitioner at Department Of Youth Capital (2021)</p>
                  
                  <p className="text-terminal-cyan font-bold mt-2">EDUCATION</p>
                  <p>- B.Tech in Computer Science, Lovely Professional University, CGPA: 7.8</p>
                  
                  <p className="text-terminal-blue mt-2">For full resume, type <span className="text-terminal-green">experience</span>.</p>
                </div>
              );
              break;
              
            default:
              output = <p className="mt-2 text-terminal-red">Error: File '{file}' not found.</p>;
          }
        } else {
          output = <p className="mt-2 text-terminal-red">Command not found: {cmd}. Type <span className="text-terminal-green">help</span> for available commands.</p>;
        }
    }
    
    // Add command to history
    setCommandHistory([...commandHistory, { command: cmd, output }]);
  };

  return (
    <div ref={containerRef} className="mt-4 max-h-64 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
      {/* Command history */}
      {commandHistory.map((item, index) => (
        <div key={index} className="mb-4">
          <div className="flex">
            <span className="text-terminal-green">$ </span>
            <span className="text-terminal-white ml-1">{item.command}</span>
          </div>
          <TerminalOutput>{item.output}</TerminalOutput>
        </div>
      ))}
      
      {/* Current command input */}
      <div className="flex items-center">
        <span className="text-terminal-green">$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 ml-1 bg-transparent text-terminal-white outline-none border-none font-mono"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}