'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  type: 'mini' | 'major';
  onComplete?: () => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
  delay: number;
}

export default function Confetti({ type, onComplete }: ConfettiProps) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const count = type === 'major' ? 50 : 20;
    const newPieces: ConfettiPiece[] = [];

    for (let i = 0; i < count; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // 0-100% of width
        y: -10, // Start above viewport
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        delay: Math.random() * 0.2
      });
    }

    setPieces(newPieces);

    // Auto-complete after animation
    const timer = setTimeout(() => {
      onComplete?.();
    }, type === 'major' ? 3000 : 2000);

    return () => clearTimeout(timer);
  }, [type, onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[800] overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: type === 'major' ? '12px' : '8px',
            height: type === 'major' ? '12px' : '8px',
            backgroundColor: piece.color,
            borderRadius: '2px'
          }}
          initial={{
            y: 0,
            x: 0,
            rotate: 0,
            opacity: 1,
            scale: piece.scale
          }}
          animate={{
            y: [0, window.innerHeight * 1.2],
            x: [(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 200],
            rotate: [piece.rotation, piece.rotation + 360 + Math.random() * 360],
            opacity: [1, 1, 0.8, 0],
            scale: [piece.scale, piece.scale, piece.scale * 0.5, 0]
          }}
          transition={{
            duration: type === 'major' ? 2.5 : 2,
            delay: piece.delay,
            ease: 'easeIn'
          }}
        />
      ))}
    </div>
  );
}
