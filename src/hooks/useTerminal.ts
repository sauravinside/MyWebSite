// src/hooks/useTerminal.ts

import { useState } from 'react';
import terminalCommands from '@/lib/terminal-commands';

export function useTerminal() {
  const [commandHistory, setCommandHistory] = useState<{ command: string; output: React.ReactNode }[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  // Process a command
  const processCommand = (command: string) => {
    if (!command.trim()) return;
    
    // Parse command and arguments
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output: React.ReactNode;
    
    // Check if command exists
    if (terminalCommands[cmd]) {
      output = terminalCommands[cmd].execute(args);
      
      // Special case for clear command
      if (cmd === 'clear') {
        setCommandHistory([]);
        return;
      }
      
      // Special case for cd command - handle actual navigation
      if (cmd === 'cd' && args.length > 0) {
        const section = args[0].toLowerCase();
        const validSections = ['home', 'about', 'experience', 'projects', 'skills', 'certifications', 'contact'];
        
        if (validSections.includes(section)) {
          // Scroll to the section after a short delay
          setTimeout(() => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
        }
      }
    } else {
      output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
    
    // Add command to history
    setCommandHistory([...commandHistory, { command, output }]);
    setCurrentInput('');
    setHistoryIndex(-1);
  };
  
  // Navigate command history
  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;
    
    if (direction === 'up') {
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else {
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };
  
  return {
    commandHistory,
    currentInput,
    setCurrentInput,
    processCommand,
    navigateHistory,
  };
}