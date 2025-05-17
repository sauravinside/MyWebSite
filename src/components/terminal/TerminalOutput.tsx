// src/components/terminal/TerminalOutput.tsx
import React from 'react';

interface TerminalOutputProps {
  children: React.ReactNode;
}

export default function TerminalOutput({ children }: TerminalOutputProps) {
  return (
    <div className="terminal-output">
      {children}
    </div>
  );
}