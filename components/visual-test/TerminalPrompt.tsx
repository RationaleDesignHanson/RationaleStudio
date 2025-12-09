'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface TerminalPromptProps {
  command: string;
  delay?: number;
  typingSpeed?: number;
  showCursor?: boolean;
  className?: string;
}

export function TerminalPrompt({
  command,
  delay = 0,
  typingSpeed = 50,
  showCursor = true,
  className,
}: TerminalPromptProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;

    const startTyping = () => {
      if (currentIndex < command.length) {
        setDisplayText(command.substring(0, currentIndex + 1));
        currentIndex++;
        timeout = setTimeout(startTyping, typingSpeed);
      } else {
        setIsComplete(true);
      }
    };

    timeout = setTimeout(startTyping, delay);

    return () => clearTimeout(timeout);
  }, [command, delay, typingSpeed]);

  return (
    <div className={cn('font-mono text-lg sm:text-xl md:text-2xl', className)}>
      <span className="text-terminal-gold">{'>'}</span>{' '}
      <span>{displayText}</span>
      {showCursor && !isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-terminal-gold ml-1 animate-cursor-blink" />
      )}
      {showCursor && isComplete && (
        <span className="inline-block w-[2px] h-[1em] bg-terminal-gold/50 ml-1" />
      )}
    </div>
  );
}
