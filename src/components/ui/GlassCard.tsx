import { useState, useRef, ReactNode } from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassCard({ children, className = "", glow, ...props }: GlassCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (props.onMouseMove) props.onMouseMove(e);
  };

  return (
    <div
      ref={cardRef}
      {...props}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => { setOpacity(1); if (props.onMouseEnter) props.onMouseEnter(e); }}
      onMouseLeave={(e) => { setOpacity(0); if (props.onMouseLeave) props.onMouseLeave(e); }}
      className={`glass-card relative ${glow ? 'shadow-[0_0_30px_rgba(16,185,129,0.1)]' : ''} ${className}`}
    >
      <div
        className="glass-card-highlight"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}
