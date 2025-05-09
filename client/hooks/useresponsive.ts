// hooks/useresponsive.ts
import { useEffect, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import { ms, scale, vs, responsiveFontSize, normalize } from '../utils/responsive';

const isTablet = () => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  return width >= 768 && aspectRatio <= 1.6;
};

export const useResponsive = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove?.();
  }, []);

  const isPortrait = dimensions.height >= dimensions.width;

  return {
    scale,
    vs,
    ms,
    responsiveFontSize,
    normalize,
    isAndroid: Platform.OS === 'android',
    isIOS: Platform.OS === 'ios',
    isPortrait,
    isLandscape: !isPortrait,
    screenWidth: dimensions.width,
    screenHeight: dimensions.height,
    isTablet: isTablet()
  };
};
