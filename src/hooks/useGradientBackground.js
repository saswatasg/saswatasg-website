import { useEffect } from 'react';
import { startGradientBg } from '@/utils/initGradientBg';

export const useGradientBackground = () => {
  useEffect(() => {
    const stopGradientAnimation = startGradientBg();
    return () => {
      if (typeof stopGradientAnimation === 'function') {
        stopGradientAnimation();
      }
    };
  }, []);
};