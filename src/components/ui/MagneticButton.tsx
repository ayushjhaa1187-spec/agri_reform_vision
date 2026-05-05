import { useRef, type ReactNode, type MouseEvent } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
}

export default function MagneticButton({ children, className = '', onClick, as = 'button', href }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const rippleRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = '';
    }, 400);
  };

  const handleClick = (e: MouseEvent) => {
    if (rippleRef.current && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      rippleRef.current.style.left = `${x}px`;
      rippleRef.current.style.top = `${y}px`;
      rippleRef.current.classList.remove('animate-ripple');
      void rippleRef.current.offsetWidth; // force reflow
      rippleRef.current.classList.add('animate-ripple');
    }
    onClick?.();
  };

  const commonProps = {
    ref: ref as any,
    className: `relative overflow-hidden ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    'data-magnetic': true,
  };

  const rippleElement = (
    <span
      ref={rippleRef}
      className="absolute w-0 h-0 rounded-full bg-white/20 pointer-events-none"
      style={{
        transform: 'translate(-50%, -50%)',
      }}
    />
  );

  // Add ripple keyframe inline style
  const rippleStyle = document.createElement('style');
  if (!document.querySelector('#ripple-style')) {
    rippleStyle.id = 'ripple-style';
    rippleStyle.textContent = `
      @keyframes ripple-expand {
        to { width: 300px; height: 300px; opacity: 0; }
      }
      .animate-ripple { animation: ripple-expand 0.6s ease-out; }
    `;
    document.head.appendChild(rippleStyle);
  }

  if (as === 'a') {
    return (
      <a {...commonProps} href={href}>
        {children}
        {rippleElement}
      </a>
    );
  }

  return (
    <button {...commonProps}>
      {children}
      {rippleElement}
    </button>
  );
}
