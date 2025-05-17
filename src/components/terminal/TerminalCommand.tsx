'use client';

import React from 'react';

interface TerminalCommandProps {
  command: string;
  result: React.ReactNode;
}

export default function TerminalCommand({ command, result }: TerminalCommandProps) {
  return (
    <div className="mb-4">
      <div className="flex">
        <span className="text-terminal-green">$ </span>
        <span className="text-terminal-white ml-1">{command}</span>
      </div>
      <div className="mt-1">
        {result}
      </div>
    </div>
  );
}