import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function FadeInSection({ children, className = "", delay = 0, direction = 'up' }: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialY = () => {
    if (direction === 'up') return 30;
    if (direction === 'down') return -30;
    return 0;
  };

  const getInitialX = () => {
    if (direction === 'left') return 30;
    if (direction === 'right') return -30;
    return 0;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: getInitialY(), x: getInitialX() }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
