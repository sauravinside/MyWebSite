export interface Certification {
    id: number;
    name: string;
    provider: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
    color: string;
    icon: string;
    description: string;
  }
  
  export const certifications: Certification[] = [
    {
      id: 1,
      name: 'Professional Cloud Network Engineer',
      provider: 'Google Cloud',
      issueDate: 'May 2023',
      expiryDate: 'May 2025',
      credentialId: '73263053',
      color: 'gcp',
      icon: '/images/certifications/gcp.png',
      description: 'Validates expertise in implementing Google Cloud networking, including VPC networks, hybrid connectivity, network services, and security.'
    },
    {
      id: 2,
      name: 'Professional Cloud Security Engineer',
      provider: 'Google Cloud',
      issueDate: 'Apr 2023',
      expiryDate: 'Apr 2025',
      credentialId: '72428931',
      color: 'gcp',
      icon: '/images/certifications/gcp.png',
      description: 'Certifies ability to design and implement secure infrastructure on Google Cloud, configure access controls, and set up network security defenses.'
    },
    {
      id: 3,
      name: 'Professional Cloud DevOps Engineer',
      provider: 'Google Cloud',
      issueDate: 'Jan 2023',
      expiryDate: 'Jan 2025',
      credentialId: '65622763',
      color: 'gcp',
      icon: '/images/certifications/gcp.png',
      description: 'Validates skills in implementing and managing continuous delivery pipelines and optimizing service performance on Google Cloud.'
    },
    {
      id: 4,
      name: 'Professional Cloud Architect',
      provider: 'Google Cloud',
      issueDate: 'Dec 2022',
      expiryDate: 'Dec 2024',
      credentialId: '64890290',
      color: 'gcp',
      icon: '/images/certifications/gcp.png',
      description: 'Certifies ability to design, develop, and manage robust, secure, scalable, highly available, and dynamic solutions on Google Cloud.'
    },
    {
      id: 5,
      name: 'Associate Cloud Engineer',
      provider: 'Google Cloud',
      issueDate: 'Sep 2022',
      expiryDate: 'Sep 2024',
      credentialId: '58258492',
      color: 'gcp',
      icon: '/images/certifications/gcp.png',
      description: 'Validates skills in deploying applications, monitoring operations, and managing enterprise solutions on Google Cloud.'
    },
    {
      id: 6,
      name: 'AWS Certified Solutions Architect - Associate',
      provider: 'Amazon Web Services',
      issueDate: 'Dec 2023',
      expiryDate: 'Dec 2026',
      credentialId: 'RQX6G5FDYF44QSG1',
      color: 'aws',
      icon: '/images/certifications/aws.png',
      description: 'Validates expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.'
    },
    {
      id: 7,
      name: 'AWS Certified Cloud Practitioner',
      provider: 'Amazon Web Services',
      issueDate: 'Sep 2022',
      expiryDate: 'Sep 2025',
      credentialId: 'QKZZC01CZ1FE1MGR',
      color: 'aws',
      icon: '/images/certifications/aws.png',
      description: 'Validates cloud fluency and foundational knowledge of AWS cloud services, architecture, security, and compliance.'
    },
    {
      id: 8,
      name: 'Microsoft Certified: Azure Fundamentals',
      provider: 'Microsoft',
      issueDate: 'Apr 2022',
      expiryDate: 'N/A (Does not expire)',
      credentialId: 'N/A',
      color: 'azure',
      icon: '/images/certifications/azure.png',
      description: 'Validates foundational knowledge of cloud concepts and Azure services, including security, privacy, compliance, and pricing.'
    },
    {
      id: 9,
      name: 'Oracle Cloud Infrastructure Foundations Associate',
      provider: 'Oracle',
      issueDate: 'Feb 2022',
      expiryDate: 'N/A (Does not expire)',
      credentialId: 'nd152689qT11W',
      color: 'terminal-red',
      icon: '/images/certifications/oracle.png',
      description: 'Validates foundational knowledge of Oracle Cloud Infrastructure services, including compute, storage, and networking concepts.'
    }
  ];
  
  export default certifications;