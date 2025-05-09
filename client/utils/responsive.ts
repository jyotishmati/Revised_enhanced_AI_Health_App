// utils/responsive.ts
import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = Platform.select({ android: 392, ios: 375, default: 375 });
const BASE_HEIGHT = Platform.select({ android: 778, ios: 812, default: 812 });

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH!) * size;
const vs = (size: number) => (SCREEN_HEIGHT / BASE_HEIGHT!) * size;

// Moderate scale for better readability (fonts, padding)
const ms = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;

// Responsive font size with PixelRatio for better control
const responsiveFontSize = (size: number) => {
  const ratio = size * (SCREEN_WIDTH / BASE_WIDTH!);
  return Math.round(PixelRatio.roundToNearestPixel(ratio));
};

// Normalize function with PixelRatio for better cross-device scaling
const normalize = (size: number) => {
  const scale = SCREEN_WIDTH / BASE_WIDTH!;
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { scale, vs, ms, responsiveFontSize, normalize };
