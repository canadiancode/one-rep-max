import Animated from 'react-native-reanimated';

import { FONT_FAMILY } from '@/constants/fonts';

export function HelloWave() {
  return (
    <Animated.Text
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        lineHeight: 32,
        marginTop: -6,
        animationName: {
          '50%': { transform: [{ rotate: '25deg' }] },
        },
        animationIterationCount: 4,
        animationDuration: '300ms',
      }}>
      👋
    </Animated.Text>
  );
}
