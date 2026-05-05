import { useRef, type ReactNode, type MouseEvent } from 'react';
import useAudio from '../../hooks/useAudio';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export default function TiltCard({ children, className = '', maxTilt = 5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const { playHover } = useAudio();

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = (mouseY / (rect.height / 2)) * -maxTilt;
    const rotateY = (mouseX / (rect.width / 2)) * maxTilt;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    if (glareRef.current) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      glareRef.current.style.background = `radial-gradient(300px circle at ${x}% ${y}%, rgba(16, 185, 129, 0.08), transparent 60%)`;
      glareRef.current.style.opacity = '1';
    }
  };

  const handleMouseEnter = () => {
    playHover();
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0';
    }
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 500);
  };

  return (
    <div
      ref={ref}
      className={`glass-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div
        ref={glareRef}
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0, zIndex: 1 }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
