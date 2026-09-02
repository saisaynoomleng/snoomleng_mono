'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type AnimateSlideInProps = {
  className?: string;
  direction: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  offset?: number;
  children: React.ReactNode;
  opacity?: 0 | 1;
};

type AnimateSlideInGroupProps = AnimateSlideInProps & {
  staggerForm?: 'random' | 'edges' | 'start' | 'center' | 'end';
};

export const AnimateSlideIn = ({
  className,
  direction,
  delay = 0,
  duration = 1,
  offset = 100,
  children,
  opacity = 0,
}: AnimateSlideInProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      const vars: gsap.TweenVars = {
        opacity,
        delay,
        duration,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;
      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;

      gsap.from(element, vars);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateSlideInStagger = ({
  className,
  direction,
  delay = 0,
  opacity = 0,
  children,
  offset = 100,
  duration = 1,
  staggerForm = 'random',
}: AnimateSlideInGroupProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      const items = element.querySelectorAll('[data-animate-item]');

      const vars: gsap.TweenVars = {
        opacity,
        delay,
        duration,
        ease: 'power4.in',
        stagger: {
          amount: 0.3,
          from: staggerForm,
        },
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      };

      if (direction === 'left') vars.x = -offset;
      if (direction === 'right') vars.x = offset;
      if (direction === 'top') vars.y = -offset;
      if (direction === 'bottom') vars.y = offset;

      gsap.from(items, vars);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};

export const AnimateImageFillIn = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return;

      gsap.fromTo(
        element,
        {
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
        },
        {
          opacity: 1,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: 'top 90%%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={twMerge(className)}>
      {children}
    </div>
  );
};
