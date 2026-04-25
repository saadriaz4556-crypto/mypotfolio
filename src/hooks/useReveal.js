import { useEffect } from 'react';

export function useReveal(ref) {
  useEffect(() => {
    if (!ref.current) return;

    const revealElements = ref.current.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, index * 40);
          }
        });
      },
      { threshold: 0.06 }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [ref]);
}
