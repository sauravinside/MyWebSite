export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    category: string;
    details: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 1,
      title: "GCP Marketplace Application Deployment",
      description: "Deployed VM and SAAS-based application to GCP Marketplace, making it available for enterprise customers.",
      image: "/images/projects/gcp-marketplace.png",
      technologies: ["GCP", "Terraform", "Docker", "Kubernetes"],
      category: "Cloud Deployment",
      details: [
        "Configured VM and container-based application deployments",
        "Set up Marketplace integration for seamless customer deployment",
        "Implemented automated testing and verification",
        "Developed documentation for end-users"
      ]
    },
    {
      id: 2,
      title: "Multi-Cloud Infrastructure as Code",
      description: "Terraformisation of pre-existing development and production projects for consistent infrastructure management.",
      image: "/images/projects/terraform.png",
      technologies: ["Terraform", "AWS", "GCP", "Azure"],
      category: "Infrastructure as Code",
      details: [
        "Converted existing manually-managed infrastructure to Terraform",
        "Created modular and reusable Terraform components",
        "Implemented CI/CD for infrastructure deployment",
        "Established state management and version control"
      ]
    },
    {
      id: 3,
      title: "Cloud Migration Projects",
      description: "Migrated applications and infrastructure from Azure to GCP and AWS to GCP with minimal downtime.",
      image: "/images/projects/cloud-migration.png",
      technologies: ["GCP", "AWS", "Azure", "Terraform"],
      category: "Cloud Migration",
      details: [
        "Developed migration strategy and architecture",
        "Implemented parallel environments for testing",
        "Managed data transfer and synchronization",
        "Executed cutover with minimal service disruption"
      ]
    },
    {
      id: 4,
      title: "Anthos Hybrid Cloud Implementation",
      description: "Centrally managed Kubernetes clusters on hybrid cloud model via Anthos for a unified management experience.",
      image: "/images/projects/anthos.png",
      technologies: ["GCP", "Anthos", "Kubernetes", "Terraform"],
      category: "Hybrid Cloud",
      details: [
        "Configured Anthos for multi-cloud Kubernetes management",
        "Set up hybrid connectivity and security policies",
        "Implemented centralized logging and monitoring",
        "Created consistent deployment pipelines"
      ]
    },
    {
      id: 5,
      title: "Employee Database Web Application",
      description: "Built a web application with backend for uploading images to S3 and using RDS for main database with DynamoDB for metadata.",
      image: "/images/projects/employee-db.png",
      technologies: ["AWS", "S3", "RDS", "DynamoDB", "Python", "Flask"],
      category: "Personal Project",
      details: [
        "Designed and implemented a scalable application architecture",
        "Created Python backend with Flask API",
        "Integrated AWS services (S3, RDS, DynamoDB)",
        "Developed image upload and processing functionality"
      ]
    },
    {
      id: 6,
      title: "Three-Tier Architecture Deployment",
      description: "Created a three-tier architecture (Web, App, and DB) using CloudFormation for automated deployment.",
      image: "/images/projects/three-tier.png",
      technologies: ["AWS", "CloudFormation", "EC2", "RDS"],
      category: "Personal Project",
      details: [
        "Designed scalable three-tier application architecture",
        "Created CloudFormation templates for infrastructure",
        "Implemented load balancing and auto-scaling",
        "Set up database replication and backups"
      ]
    }
  ];
  
  export default projects;