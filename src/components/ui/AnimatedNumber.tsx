import { useState, useEffect } from 'react';

export default function AnimatedNumber({ value, duration = 2000 }: { value: string | number, duration?: number }) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const targetValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d.-]/g, '')) : value;
  const isPercentage = typeof value === 'string' && value.includes('%');
  const isCurrency = typeof value === 'string' && value.includes('₹');
  const isMetric = typeof value === 'string' && value.includes('t/ha');

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * targetValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetValue, duration]);

  if (isNaN(targetValue)) return <span>{value}</span>;

  let finalDisplay = displayValue.toString();
  if (isPercentage) finalDisplay = `${displayValue}%`;
  if (isCurrency) finalDisplay = `₹${displayValue.toLocaleString()}`;
  if (isMetric) finalDisplay = `${(displayValue/10).toFixed(1)} t/ha`; // Special case for yield

  return <span>{finalDisplay}</span>;
}
