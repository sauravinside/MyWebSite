import { FaAws, FaGoogle, FaDocker, FaPython, FaLinux } from 'react-icons/fa';
import { SiTerraform, SiKubernetes } from 'react-icons/si';

export interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  icons: any[];
}

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Searce Cosourcing Pvt Ltd',
    position: 'Cloud Engineer',
    duration: 'June 2022 - Present',
    location: 'Gurugram, India',
    description: 'Working on enterprise-level cloud infrastructure and DevOps solutions.',
    responsibilities: [
      'Terraform modules and CloudFormation development',
      'Cloud migration (Azure to GCP, AWS to GCP)',
      'Linux servers & EKS administration',
      'Monitoring with Prometheus and Grafana',
      'Kubernetes clusters management with Anthos',
      'Shell/Python scripting for automation',
      'WAF & SIEM implementation'
    ],
    technologies: ['AWS', 'GCP', 'Terraform', 'Kubernetes', 'Python', 'Linux'],
    icons: [FaAws, FaGoogle, SiTerraform, SiKubernetes, FaPython, FaLinux]
  },
  {
    id: 2,
    company: 'Intellipaat Software Solutions',
    position: 'Lead Cloud Analyst',
    duration: 'June 2021 - May 2022',
    location: 'Bangalore, India',
    description: 'Led cloud infrastructure projects and provided technical consulting.',
    responsibilities: [
      'CI/CD pipeline implementation (GitHub Actions, Jenkins, CodePipeline)',
      'Security best practices and AWS Governance',
      'Linux configuration with Apache and PHP',
      'Python automation with BOTO SDK',
      'OpenShift and EKS implementation'
    ],
    technologies: ['AWS', 'CI/CD', 'Docker', 'Python', 'Terraform', 'GCP'],
    icons: [FaAws, FaDocker, FaPython, SiTerraform, FaGoogle]
  },
  {
    id: 3,
    company: 'Department Of Youth Capital',
    position: 'AWS Cloud Practitioner (Internship)',
    duration: 'Jan 2021 - Jun 2021',
    location: 'Jalandhar, Punjab, India',
    description: 'Gained hands-on experience with AWS cloud services and infrastructure.',
    responsibilities: [
      'Static website hosting on VMs and S3',
      'Route53 DNS management',
      'Basic cloud services implementation'
    ],
    technologies: ['AWS', 'Linux', 'Python'],
    icons: [FaAws, FaLinux, FaPython]
  }
];

export default experiences;