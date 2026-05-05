import { useRef, type ReactNode, type MouseEvent } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  hoverScale?: boolean;
}

export default function GlassCard({ children, className = '', glow = false, hoverScale = false }: GlassCardProps) {
  const highlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!highlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    highlightRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.06), transparent 60%)`;
  };

  const baseClass = glow ? 'glass-card-glow' : 'glass-card';

  return (
    <div
      className={`${baseClass} ${hoverScale ? 'transition-transform duration-300 hover:scale-[1.02]' : ''} ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={highlightRef} className="glass-card-highlight" />
      {children}
    </div>
  );
}
