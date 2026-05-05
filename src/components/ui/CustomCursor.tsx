import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  const animate = useCallback(() => {
    const dx = mousePos.current.x - cursorPos.current.x;
    const dy = mousePos.current.y - cursorPos.current.y;
    cursorPos.current.x += dx * 0.15;
    cursorPos.current.y += dy * 0.15;

    if (outerRef.current) {
      outerRef.current.style.transform = `translate(${cursorPos.current.x - 20}px, ${cursorPos.current.y - 20}px) scale(${isHovering ? 1.5 : 1})`;
    }
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${mousePos.current.x - 4}px, ${mousePos.current.y - 4}px)`;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, [isHovering]);

  useEffect(() => {
    // Only show on desktop (fine pointer)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-magnetic]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('[data-magnetic]') ||
        target.closest('input') ||
        target.closest('textarea')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [animate]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={outerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: `1.5px solid ${isHovering ? 'rgba(16, 185, 129, 0.8)' : 'rgba(16, 185, 129, 0.4)'}`,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'border-color 0.3s ease, width 0.3s ease, height 0.3s ease',
          mixBlendMode: 'difference' as const,
        }}
      />
      {/* Inner dot */}
      <div
        ref={innerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#10b981',
          pointerEvents: 'none',
          zIndex: 99999,
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.5)',
        }}
      />
    </>
  );
}
