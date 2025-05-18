import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

interface ContactFormProps {
  onSubmit?: (formData: FormData) => void;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const TerminalContactForm: React.FC<ContactFormProps> = ({ onSubmit, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentCommand, setCurrentCommand] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  // Form validation
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simulate terminal command typing for name, email, and subject
    if (name === 'name' || name === 'email' || name === 'subject') {
      const commandMap = {
        'name': 'set-name',
        'email': 'set-email',
        'subject': 'set-subject'
      };
      setCurrentCommand(`${commandMap[name as keyof typeof commandMap]} "${value}"`);
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      addCommandToHistory(`submit-message --from "${formData.name}" --subject "${formData.subject || 'No Subject'}"`);
      
      // Simulate form submission
      setTimeout(() => {
        if (onSubmit) {
          onSubmit(formData);
        }
        
        setIsSubmitting(false);
        setIsSubmitted(true);
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1500);
    }
  };
  
  // Add command to command history
  const addCommandToHistory = (command: string) => {
    setCommandHistory(prev => [...prev, command]);
    setCurrentCommand('');
  };
  
  // Add typed command to history when field is blurred
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (formData[name as keyof FormData] && currentCommand) {
      addCommandToHistory(currentCommand);
    }
  };
  
  return (
    <div className={`${className}`}>
      <div className="terminal-window overflow-hidden">
        <div className="flex items-center p-2 bg-terminal-gray">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <div className="mx-auto text-sm text-terminal-white font-mono">
            contact.sh
          </div>
        </div>
        
        <div className="p-4">
          {/* Command History */}
          <div className="font-mono text-sm mb-4">
            <div className="mb-4">
              <span className="text-terminal-green">$ </span>
              <span className="text-terminal-white">./init-contact-form.sh</span>
            </div>
            
            <p className="text-terminal-white">Welcome to the contact terminal. Please fill out the form below:</p>
            
            {commandHistory.map((command, index) => (
              <div key={index} className="mt-2">
                <span className="text-terminal-green">$ </span>
                <span className="text-terminal-white">{command}</span>
                
                {index === commandHistory.length - 1 && command.startsWith('submit-message') && (
                  <div className="mt-1">
                    {isSubmitting ? (
                      <div className="text-terminal-yellow">
                        Sending message...
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                          |
                        </motion.span>
                      </div>
                    ) : (
                      isSubmitted && (
                        <div className="text-terminal-green">
                          ✓ Message sent successfully! I'll get back to you soon.
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {currentCommand && (
              <div className="mt-2">
                <span className="text-terminal-green">$ </span>
                <span className="text-terminal-white">{currentCommand}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  |
                </motion.span>
              </div>
            )}
          </div>
          
          {/* Contact Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-terminal-white font-mono text-sm mb-1">
                  <span className="text-terminal-green">$</span> name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 bg-terminal-black/50 border ${
                    formErrors.name ? 'border-terminal-red' : 'border-terminal-gray'
                  } rounded text-terminal-white font-mono focus:outline-none focus:border-terminal-purple`}
                  placeholder="Enter your name"
                />
                {formErrors.name && (
                  <p className="text-terminal-red text-xs mt-1">Error: {formErrors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-terminal-white font-mono text-sm mb-1">
                  <span className="text-terminal-green">$</span> email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-3 py-2 bg-terminal-black/50 border ${
                    formErrors.email ? 'border-terminal-red' : 'border-terminal-gray'
                  } rounded text-terminal-white font-mono focus:outline-none focus:border-terminal-purple`}
                  placeholder="Enter your email"
                />
                {formErrors.email && (
                  <p className="text-terminal-red text-xs mt-1">Error: {formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-terminal-white font-mono text-sm mb-1">
                  <span className="text-terminal-green">$</span> subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-terminal-black/50 border border-terminal-gray rounded text-terminal-white font-mono focus:outline-none focus:border-terminal-purple"
                  placeholder="Enter subject (optional)"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-terminal-white font-mono text-sm mb-1">
                  <span className="text-terminal-green">$</span> message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-3 py-2 bg-terminal-black/50 border ${
                    formErrors.message ? 'border-terminal-red' : 'border-terminal-gray'
                  } rounded text-terminal-white font-mono focus:outline-none focus:border-terminal-purple resize-none`}
                  placeholder="Type your message here..."
                ></textarea>
                {formErrors.message && (
                  <p className="text-terminal-red text-xs mt-1">Error: {formErrors.message}</p>
                )}
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-terminal-green/20 hover:bg-terminal-green/30 border border-terminal-green text-terminal-green py-2 px-4 rounded font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-green/50"
                >
                  <div className="flex items-center justify-center">
                    <span className="mr-2">$</span>
                    <span>{isSubmitting ? 'Sending...' : 'Submit Message'}</span>
                  </div>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-8">
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-terminal-green/20 text-terminal-green">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-terminal-white mb-2">Message Sent Successfully!</h3>
                <p className="text-terminal-white/80 mb-6">Thank you for reaching out. I'll get back to you as soon as possible.</p>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-terminal-black/50 hover:bg-terminal-black/70 border border-terminal-gray/50 text-terminal-green py-2 px-4 rounded font-mono transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-2">$</span>
                    <span>Send Another Message</span>
                  </div>
                </button>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ContactInfoProps {
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
  email,
  phone,
  website,
  github,
  linkedin,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <div className="terminal-window">
        <div className="flex items-center p-2 bg-terminal-gray">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-yellow"></div>
            <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
          </div>
          <div className="mx-auto text-sm text-terminal-white font-mono">
            contact-info.sh
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <span className="text-terminal-green">$ </span>
            <span className="text-terminal-white">./get-contact-info.sh</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-terminal-green/20 flex items-center justify-center text-terminal-green">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-mono text-sm text-terminal-gray">Email</p>
                <a 
                  href={`mailto:${email}`}
                  className="text-terminal-white hover:text-terminal-green transition-colors block mt-1"
                >
                  {email}
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-terminal-pink/20 flex items-center justify-center text-terminal-pink">
                <FaPhone />
              </div>
              <div>
                <p className="font-mono text-sm text-terminal-gray">Phone</p>
                <a 
                  href={`tel:${phone}`}
                  className="text-terminal-white hover:text-terminal-pink transition-colors block mt-1"
                >
                  {phone}
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-terminal-purple/20 flex items-center justify-center text-terminal-purple">
                <FaGlobe />
              </div>
              <div>
                <p className="font-mono text-sm text-terminal-gray">Website</p>
                <a 
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-white hover:text-terminal-purple transition-colors block mt-1"
                >
                  {website}
                </a>
              </div>
            </div>
            
            <div className="border-t border-terminal-gray/30 my-4"></div>
            
            <p className="text-terminal-cyan mb-4">Connect on Social Media:</p>
            
            <div className="flex space-x-4">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-terminal-gray/20 flex items-center justify-center text-terminal-white hover:bg-terminal-gray/40 transition-colors"
              >
                <FaGithub size={24} />
              </a>
              
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-terminal-gray/20 flex items-center justify-center text-terminal-white hover:bg-terminal-gray/40 transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          
          {/* Availability status */}
          <div className="mt-8 border-t border-terminal-gray/30 pt-4">
            <p className="text-terminal-cyan mb-2"># Availability Status</p>
            <div className="flex items-center">
              <span className="inline-block w-3 h-3 rounded-full bg-terminal-green mr-2"></span>
              <p className="text-terminal-white">Available for new opportunities</p>
            </div>
            <p className="text-terminal-white/70 mt-2 text-sm">
              Open to freelance projects, collaborations, and full-time positions in cloud engineering.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactSectionProps {
  email: string;
  phone: string;
  website: string;
  github: string;
  linkedin: string;
  onSubmit?: (formData: FormData) => void;
  className?: string;
}

const ContactSection: React.FC<ContactSectionProps> = (props) => {
  return (
    <div className={`${props.className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ContactInfo
          email={props.email}
          phone={props.phone}
          website={props.website}
          github={props.github}
          linkedin={props.linkedin}
        />
        <TerminalContactForm onSubmit={props.onSubmit} />
      </div>
    </div>
  );
};

export { TerminalContactForm, ContactInfo, ContactSection };
export default ContactSection;