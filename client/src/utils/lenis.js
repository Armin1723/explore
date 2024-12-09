import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      smoothTouch: false,
    });

    const onRaf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(onRaf);
    };

    requestAnimationFrame(onRaf);

    return () => lenis.destroy();
  }, []);
};

export default useLenis; 