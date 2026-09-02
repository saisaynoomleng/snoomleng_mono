'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import React, { useRef } from 'react';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

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

      if (!items.length) return;

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
            start: 'top 90%',
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

export const AnimateTextLineFillIn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const element = containerRef.current;

      if (!element) return null;

      const split = SplitText.create(element, { type: 'lines' });

      gsap.fromTo(
        split.lines,
        { opacity: 0, yPercent: -100 },
        {
          opacity: 1,
          yPercent: 0,
          ease: 'power4.in',
          stagger: { amount: 0.2 },
          scrollTrigger: {
            trigger: split.lines,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <p ref={containerRef} className={twMerge(className)}>
      {children}
    </p>
  );
};

export const AnimateTypeWriter = ({
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

      const split = SplitText.create(element, { type: 'chars' });

      gsap.fromTo(
        split.chars,
        { opacity: 0, yPercent: -100 },
        {
          opacity: 1,
          yPercent: 0,
          stagger: {
            amount: 0.2,
            from: 'random',
          },
          scrollTrigger: {
            trigger: split.chars,
            start: 'top 90%',
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
