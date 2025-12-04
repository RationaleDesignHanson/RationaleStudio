import { useState, useEffect } from 'react';

type Orientation = 'portrait' | 'landscape';
type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface OrientationState {
  orientation: Orientation;
  deviceType: DeviceType;
  isPortrait: boolean;
  isLandscape: boolean;
  width: number;
  height: number;
  shouldRotate: boolean; // True if portrait on mobile for specific demos
}

export function useOrientation(): OrientationState {
  const [state, setState] = useState<OrientationState>(() => {
    if (typeof window === 'undefined') {
      return {
        orientation: 'landscape',
        deviceType: 'desktop',
        isPortrait: false,
        isLandscape: true,
        width: 1920,
        height: 1080,
        shouldRotate: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation: Orientation = height > width ? 'portrait' : 'landscape';

    let deviceType: DeviceType = 'desktop';
    if (width < 768) deviceType = 'mobile';
    else if (width < 1024) deviceType = 'tablet';

    return {
      orientation,
      deviceType,
      isPortrait: orientation === 'portrait',
      isLandscape: orientation === 'landscape',
      width,
      height,
      shouldRotate: deviceType === 'mobile' && orientation === 'portrait',
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation: Orientation = height > width ? 'portrait' : 'landscape';

      let deviceType: DeviceType = 'desktop';
      if (width < 768) deviceType = 'mobile';
      else if (width < 1024) deviceType = 'tablet';

      setState({
        orientation,
        deviceType,
        isPortrait: orientation === 'portrait',
        isLandscape: orientation === 'landscape',
        width,
        height,
        shouldRotate: deviceType === 'mobile' && orientation === 'portrait',
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return state;
}
