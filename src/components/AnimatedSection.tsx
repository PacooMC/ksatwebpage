import React from 'react';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

export function AnimatedSection({ children }: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "-50px"
  });

  return (
    <div
      ref={ref}
      style={{
        transform: inView ? "none" : "translateY(50px)",
        opacity: inView ? 1 : 0,
        transition: "all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
      }}
    >
      {children}
    </div>
  );
}
