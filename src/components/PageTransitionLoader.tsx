'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransitionLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<NodeJS.Timeout | null>(null);

  const startLoading = useCallback(() => {
    setLoading(true);
    setVisible(true);
    setProgress(0);

    let current = 0;
    progressRef.current = setInterval(() => {
      current += Math.random() * 15 + 5;
      if (current > 85) current = 85;
      setProgress(current);
    }, 100);
  }, []);

  const stopLoading = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
    timerRef.current = setTimeout(() => {
      setLoading(false);
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);
    }, 200);
  }, []);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      startLoading();
      const done = setTimeout(() => stopLoading(), 150);
      prevPathname.current = pathname;
      return () => clearTimeout(done);
    }
  }, [pathname, startLoading, stopLoading]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;
      if (href !== pathname) {
        startLoading();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname, startLoading]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px]"
      style={{ opacity: loading ? 1 : 0, transition: 'opacity 300ms ease' }}
    >
      <div
        className="h-full bg-neutral-900 rounded-r-full"
        style={{
          width: `${progress}%`,
          transition: progress === 0 ? 'none' : 'width 200ms ease-out',
        }}
      />
    </div>
  );
}
