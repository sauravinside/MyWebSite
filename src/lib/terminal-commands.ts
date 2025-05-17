// src/lib/terminal-commands.ts

export interface TerminalCommand {
    name: string;
    description: string;
    execute: (args?: string[]) => string | React.ReactNode;
  }
  
  export const terminalCommands: Record<string, TerminalCommand> = {
    help: {
      name: 'help',
      description: 'Show available commands',
      execute: () => `
  Available commands:
    help                   Show this help message
    about                  Display information about Saurav Singh
    skills                 List technical skills
    experience             Show work experience
    education              Display educational background
    certifications         List professional certifications
    projects               Display portfolio projects
    contact                Show contact information
    clear                  Clear the terminal
    ls                     List sections
    cd [section]           Navigate to a section
    cat [file]             View content of a file
  `
    },
    
    about: {
      name: 'about',
      description: 'Display information about Saurav Singh',
      execute: () => `
  Name: Saurav Singh
  Role: Cloud Engineer 
  Location: Bengaluru/Gurugram, India
  
  Cloud Engineer with 3+ years of experience in AWS, GCP, Azure, and OCI.
  Automation enthusiast with strong communication skills and a special knack for creating innovative solutions.
  Highly certified in cloud technologies with expertise in DevOps practices, Terraform, and infrastructure as code.
  
  Type 'skills' to see my technical expertise.
  `
    },
    
    skills: {
      name: 'skills',
      description: 'List technical skills',
      execute: () => `
  Technical Skills:
  
  Cloud Platforms:
    - AWS, GCP, Azure, OCI
  
  DevOps:
    - Jenkins, Ansible, Kubernetes, GitHub, GitLab, Bitbucket, Docker
  
  Automation:
    - Terraform, CloudFormation, Shell scripting, Python
  
  Web Servers & Databases:
    - Apache, Nginx, MySQL
  
  Operating Systems:
    - Linux
  
  Security:
    - IAM, Inspector, AWS governance tools
  
  Type 'certifications' to see my cloud certifications.
  `
    },
    
    experience: {
      name: 'experience',
      description: 'Show work experience',
      execute: () => `
  Work Experience:
  
  Searce Cosourcing Pvt Ltd (June 2022 - Present)
  Cloud Engineer
  - Terraform modules and CloudFormation development
  - Cloud migration (Azure to GCP, AWS to GCP)
  - Linux servers & EKS administration
  - Monitoring with Prometheus and Grafana
  - Kubernetes clusters management with Anthos
  - Shell/Python scripting for automation
  - WAF & SIEM implementation
  
  Intellipaat Software Solutions (June 2021 - May 2022)
  Lead Cloud Analyst
  - CI/CD pipeline implementation
  - Security best practices and AWS Governance
  - Linux with Apache and PHP configuration
  - Python automation with BOTO SDK
  - OpenShift and EKS implementation
  
  Department Of Youth Capital (Jan 2021 - Jun 2021)
  AWS Cloud Practitioner (Internship)
  - Static website hosting on VMs and S3
  - Route53 DNS management
  - Basic cloud services implementation
  
  Type 'projects' to view my portfolio projects.
  `
    },
    
    certifications: {
      name: 'certifications',
      description: 'List professional certifications',
      execute: () => `
  Professional Certifications:
  
  Google Cloud Certifications:
  ✓ Professional Cloud Network Engineer
  ✓ Professional Cloud Security Engineer
  ✓ Professional Cloud DevOps Engineer
  ✓ Professional Cloud Architect
  ✓ Associate Cloud Engineer
  
  AWS Certifications:
  ✓ AWS Certified Solutions Architect - Associate
  ✓ AWS Certified Cloud Practitioner
  
  Microsoft Certification:
  ✓ Azure Fundamentals (AZ-900)
  
  Oracle Certification:
  ✓ Oracle Cloud Infrastructure Foundations Associate
  `
    },
    
    education: {
      name: 'education',
      description: 'Display educational background',
      execute: () => `
  Educational Background:
  
  Bachelor of Technology (B-Tech) in Computer Science
  Lovely Professional University
  CGPA: 7.8 (Equivalent to 80%)
  
  Intermediate Education (2017)
  Holy Convent Sr Sec School
  Percentage: 92%
  
  Matriculation Education (2015)
  DAV HR Sec School
  CGPA: 10.0
  `
    },
    
    projects: {
      name: 'projects',
      description: 'Display portfolio projects',
      execute: () => `
  Portfolio Projects:
  
  Cloud Deployments:
  - VM and SAAS-based application deployment to GCP Marketplace
  - Terraformisation of pre-existing development and production projects
  - Cloud migrations (Azure to GCP, AWS to GCP)
  - Anthos implementation for hybrid cloud management
  
  Personal Projects:
  - Employee Database Web App with S3, RDS, DynamoDB, Python/Flask
  - Three-Tier Architecture (Web, App, DB) with CloudFormation
  - Zoom API Integration for automated report downloads
  - Portfolio Website with message notifications, hosted on AWS
  
  Type 'cd projects' to navigate to the projects section for more details.
  `
    },
    
    contact: {
      name: 'contact',
      description: 'Show contact information',
      execute: () => `
  Contact Information:
  
  Email: singhsaurav400@gmail.com
  Phone: +91-9899123603
  Website: www.sauravsingh.tech
  GitHub: github.com/sauravinside
  LinkedIn: linkedin.com/in/saurav-singh-81321b16a
  
  Feel free to reach out for collaborations or opportunities!
  `
    },
    
    clear: {
      name: 'clear',
      description: 'Clear the terminal',
      execute: () => ''
    },
    
    ls: {
      name: 'ls',
      description: 'List sections',
      execute: () => `
  Available sections:
    home/
    about/
    experience/
    projects/
    skills/
    certifications/
    contact/
  
  Use 'cd [section]' to navigate.
  `
    },
    
    cd: {
      name: 'cd',
      description: 'Navigate to a section',
      execute: (args) => {
        const section = args?.[0]?.toLowerCase();
        
        if (!section) {
          return 'Usage: cd [section]';
        }
        
        const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
        
        if (validSections.includes(section)) {
          return `Navigating to ${section} section...`;
        } else {
          return `Error: Section '${section}' not found. Type 'ls' to see available sections.`;
        }
      }
    },
    
    cat: {
      name: 'cat',
      description: 'View content of a file',
      execute: (args) => {
        const file = args?.[0]?.toLowerCase();
        
        if (!file) {
          return 'Usage: cat [file]';
        }
        
        switch (file) {
          case 'profile.txt':
            return `
  === profile.txt ===
  Name: Saurav Singh
  Role: Cloud Engineer
  Location: Bengaluru/Gurugram, India
  Experience: 3+ years in Cloud & DevOps
  Expertise: AWS, GCP, Azure, Terraform, Kubernetes
  `;
            
          case 'resume.txt':
            return `
  === resume.txt ===
  SUMMARY
  Cloud Engineer with 3+ years of experience. Automation enthusiast with strong communication skills.
  
  EXPERIENCE
  - Cloud Engineer at Searce (2022-Present)
  - Lead Cloud Analyst at Intellipaat (2021-2022)
  - AWS Cloud Practitioner at Department Of Youth Capital (2021)
  
  EDUCATION
  - B.Tech in Computer Science, Lovely Professional University, CGPA: 7.8
  
  For full resume, type 'experience'.
  `;
            
          default:
            return `Error: File '${file}' not found.`;
        }
      }
    }
  };
  
  export default terminalCommands;