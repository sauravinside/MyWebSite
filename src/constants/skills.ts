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
  
  export interface Skill {
    name: string;
    icon: any;
    level: number;
    color: string;
  }
  
  export interface SkillCategory {
    name: string;
    skills: Skill[];
  }
  
  export const skillCategories: SkillCategory[] = [
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
  
  export default skillCategories;