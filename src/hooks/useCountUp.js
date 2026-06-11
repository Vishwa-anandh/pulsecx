import { useState, useEffect } from 'react';

export function useCountUp(endValue, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(endValue);
    if (isNaN(end)) { setValue(endValue); return; }
    if (end === 0) { setValue(0); return; }
    
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setValue(start + (end - start) * easeOutQuart);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [endValue, duration]);

  if (typeof endValue === 'string' && endValue.includes('%')) {
    return value.toFixed(1) + '%';
  }
  
  if (typeof endValue === 'number' && endValue % 1 === 0) {
    return Math.floor(value).toString();
  }
  
  if (typeof endValue === 'string' && endValue.includes('s')) {
    return value.toFixed(1) + 's';
  }

  return value.toFixed(1);
}
