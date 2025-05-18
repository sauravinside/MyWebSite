import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CertificationBadgeProps {
  id: number;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  color: string;
  icon: string;
  description: string;
  onClick?: (id: number) => void;
}

const CertificationBadge: React.FC<CertificationBadgeProps> = ({
  id,
  name,
  provider,
  issueDate,
  expiryDate,
  credentialId,
  color,
  icon,
  description,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  
  // Get a suitable text color based on the badge background color
  const getTextColor = () => {
    switch (color) {
      case 'aws':
        return 'text-black';
      case 'gcp':
      case 'azure':
      case 'terminal-purple':
      case 'terminal-pink':
      case 'terminal-red':
        return 'text-white';
      default:
        return 'text-terminal-white';
    }
  };
  
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl cursor-pointer bg-${color}/10 border border-${color}/30`}
      whileHover={{ y: -5, boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(var(--color-${color}), 0.3)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Badge Design */}
      <div className="p-5">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-4">
          {/* Logo/Icon */}
          <div className={`w-12 h-12 rounded-full bg-${color}/20 flex items-center justify-center p-2`}>
            <img src={icon} alt={provider} className="w-full h-full object-contain" />
          </div>
          
          {/* Status Badge */}
          <div className="flex items-center bg-terminal-black/30 rounded-full px-2 py-1">
            <span className="w-2 h-2 rounded-full bg-terminal-green mr-2"></span>
            <span className="text-xs font-mono text-terminal-green">Valid</span>
          </div>
        </div>
        
        {/* Certification Information */}
        <div>
          <h3 className={`text-lg font-bold mb-1 ${getTextColor()}`}>
            {name}
          </h3>
          <p className={`text-sm mb-3 ${getTextColor()} opacity-80`}>
            {provider}
          </p>
          
          {/* Details - Only shown on hover */}
          <motion.div
            className="space-y-1 text-xs font-mono"
            initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              height: isHovered ? 'auto' : 0,
              overflow: isHovered ? 'visible' : 'hidden'
            }}
            transition={{ duration: 0.2 }}
          >
            <p className={`${getTextColor()} opacity-70`}>ID: {credentialId}</p>
            <p className={`${getTextColor()} opacity-70`}>Issued: {issueDate}</p>
            <p className={`${getTextColor()} opacity-70`}>Expires: {expiryDate}</p>
          </motion.div>
        </div>
      </div>
      
      {/* Hover overlay with full description */}
      <motion.div
        className={`absolute inset-0 p-5 bg-${color} flex flex-col justify-center items-center text-center pointer-events-none`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.95 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={`text-lg font-bold mb-2 ${getTextColor()}`}>
          {name}
        </h3>
        <p className={`text-sm ${getTextColor()} opacity-90`}>
          {description}
        </p>
      </motion.div>
      
      {/* Decorative diagonal line */}
      <div className={`absolute top-0 right-0 w-20 h-20 transform rotate-45 translate-x-10 -translate-y-10 bg-${color}/20`}></div>
    </motion.div>
  );
};

interface CertificationGridProps {
  certifications: CertificationBadgeProps[];
  className?: string;
}

const CertificationGrid: React.FC<CertificationGridProps> = ({ 
  certifications,
  className = ''
}) => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  
  // Group certifications by provider
  const groupedCertifications = certifications.reduce((groups, cert) => {
    if (!groups[cert.provider]) {
      groups[cert.provider] = [];
    }
    groups[cert.provider].push(cert);
    return groups;
  }, {} as Record<string, CertificationBadgeProps[]>);
  
  const handleCertificationClick = (id: number) => {
    setSelectedCert(id === selectedCert ? null : id);
  };
  
  return (
    <div className={className}>
      {Object.entries(groupedCertifications).map(([provider, certs], groupIndex) => (
        <div key={provider} className="mb-12">
          <motion.h3 
            className="text-2xl font-bold mb-6 text-terminal-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: groupIndex * 0.2 }}
          >
            {provider}
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certs.map((cert, index) => (
              <CertificationBadge
                key={cert.id}
                {...cert}
                onClick={handleCertificationClick}
              />
            ))}
          </div>
        </div>
      ))}
      
      {/* Selected certification terminal display */}
      {selectedCert !== null && (
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
              certification-verify.sh
            </div>
          </div>
          
          <div className="p-4 font-mono text-sm">
            <div className="mb-4">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-white">verify-cert --id {selectedCert}</span>
            </div>
            
            {certifications.filter(c => c.id === selectedCert).map(cert => (
              <div key={cert.id}>
                <div className="mb-4">
                  <p className="text-terminal-cyan"># Verification Process</p>
                  <p className="text-terminal-white">Connecting to {cert.provider} verification service...</p>
                  <p className="text-terminal-green">Connection established.</p>
                  <p className="text-terminal-white">Verifying credential ID: {cert.credentialId}</p>
                  <p className="text-terminal-green">✓ Certificate verified successfully.</p>
                </div>
                
                <div className="border-t border-terminal-gray/30 pt-4 mb-4">
                  <p className="text-terminal-cyan"># Certificate Details</p>
                  <p className="text-terminal-yellow">Name: <span className="text-terminal-white">{cert.name}</span></p>
                  <p className="text-terminal-yellow">Provider: <span className="text-terminal-white">{cert.provider}</span></p>
                  <p className="text-terminal-yellow">Issued Date: <span className="text-terminal-white">{cert.issueDate}</span></p>
                  <p className="text-terminal-yellow">Expiry Date: <span className="text-terminal-white">{cert.expiryDate}</span></p>
                  <p className="text-terminal-yellow">Status: <span className="text-terminal-green">Active</span></p>
                </div>
                
                <div className="border-t border-terminal-gray/30 pt-4">
                  <p className="text-terminal-cyan"># Certification Description</p>
                  <p className="text-terminal-white mt-2">{cert.description}</p>
                </div>
                
                {/* Interactive verification animation */}
                <div className="mt-6 pt-4 border-t border-terminal-gray/30">
                  <p className="text-terminal-green">✓ Digital signature verified</p>
                  <p className="text-terminal-green">✓ Issuer authority confirmed</p>
                  <p className="text-terminal-green">✓ Credential status active</p>
                  
                  <div className="mt-4 flex justify-center">
                    <div className="inline-block relative">
                      <motion.div 
                        className="absolute inset-0 border-2 border-terminal-green rounded-full"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "loop"
                        }}
                      />
                      <motion.div 
                        className={`w-24 h-24 rounded-full bg-${cert.color}/20 flex items-center justify-center p-2`}
                      >
                        <img src={cert.icon} alt={cert.provider} className="w-16 h-16 object-contain" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      {/* Certification Timeline */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold mb-8 text-terminal-white">Certification Timeline</h3>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-1 bg-gradient-to-r from-terminal-purple via-terminal-pink to-terminal-green w-full top-10 transform -translate-y-1/2"></div>
          
          {/* Year markers */}
          {['2022', '2023', '2024', '2025', '2026'].map((year, index) => (
            <div key={year} className="absolute" style={{ left: `${index * 25}%` }}>
              <div className="w-1 h-4 bg-terminal-gray absolute top-10 left-0 transform -translate-y-1/2"></div>
              <div className="absolute top-12 left-0 transform -translate-x-1/2 text-sm text-terminal-gray font-mono">
                {year}
              </div>
            </div>
          ))}
          
          {/* Certifications on timeline */}
          {certifications.map((cert) => {
            // Calculate position based on issue date
            const yearMonth = cert.issueDate.split(' ');
            const year = parseInt(yearMonth[1]);
            const monthMap: Record<string, number> = {
              'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
              'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
            };
            const month = monthMap[yearMonth[0]] / 12;
            
            // Position on timeline (2022-2026 range, 5 years)
            const position = ((year - 2022) + month) / 4 * 100;
            
            return (
              <motion.div
                key={cert.id}
                className="absolute top-10 cursor-pointer"
                style={{ left: `${position}%` }}
                whileHover={{ y: -5 }}
                onClick={() => handleCertificationClick(cert.id)}
              >
                <div className={`w-5 h-5 rounded-full bg-${cert.color} border-2 border-terminal-black transform -translate-x-1/2 -translate-y-1/2`}></div>
                <div className={`hidden absolute bottom-3 w-40 p-2 rounded bg-${cert.color}/80 text-xs text-white whitespace-normal transform -translate-x-1/2 group-hover:block text-center`}>
                  {cert.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default CertificationGrid;