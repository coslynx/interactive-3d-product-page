import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../App';
import { sanitize } from 'dompurify';

interface TextSplitterProps {
  text: string;
  animationDelayIncrement?: number;
  className?: string;
  variants?: {
    hidden: { opacity: number, y: number };
    visible: {
      opacity: number;
      y: number;
      transition: {
        delayChildren: number;
        staggerChildren: number;
      };
    };
    letter: {
      hidden: { opacity: number, y: number },
      visible: {
        opacity: number;
        y: number;
        transition: {
          duration: number;
        };
      }
    };
  };
}

const TextSplitter: React.FC<TextSplitterProps> = React.memo(({
  text,
  animationDelayIncrement = 0.05,
  className = '',
  variants = {
    hidden: { opacity: 0, y: 75 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    letter: {
      hidden: { opacity: 0, y: 50 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
        },
      },
    },
  },
}) => {
  const words = useMemo(() => {
    const cleanText = sanitize(text);
    return cleanText.split(' ');
  }, [text]);

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={variants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="mr-2 inline-block"
          style={{ whiteSpace: 'nowrap' }}
        >
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              className="inline-block"
              variants={variants.letter}
              style={{ display: 'inline-block' }}
              transition={{
                delay: letterIndex * animationDelayIncrement,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
});

TextSplitter.displayName = 'TextSplitter';

export default TextSplitter;