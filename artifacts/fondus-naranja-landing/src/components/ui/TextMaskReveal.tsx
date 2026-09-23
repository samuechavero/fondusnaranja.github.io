import React from 'react';
import { motion } from 'framer-motion';

interface TextMaskRevealProps {
  lines: {
    words: {
      text: string;
      className?: string;
    }[];
  }[];
  className?: string;
  delay?: number;
}

export function TextMaskReveal({ lines, className = '', delay = 0.15 }: TextMaskRevealProps) {
  let wordIndex = 0;

  return (
    <h1 className={`${className} select-none`}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block leading-[0.92] overflow-hidden py-1">
          {line.words.map((word) => {
            const currentDelay = delay + wordIndex * 0.08;
            wordIndex++;

            return (
              <span
                key={`${lineIdx}-${word.text}`}
                className="inline-block overflow-hidden align-top mr-[0.22em] last:mr-0"
              >
                <motion.span
                  className={`inline-block ${word.className || ''}`}
                  initial={{ y: '120%', opacity: 0, rotateZ: 2 }}
                  animate={{ y: '0%', opacity: 1, rotateZ: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 18,
                    delay: currentDelay,
                  }}
                >
                  {word.text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
export default TextMaskReveal;
