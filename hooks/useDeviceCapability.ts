/**
 * Device Capability Detection Hook
 * Detects device capabilities and provides optimal rendering strategy
 */

import { useEffect, useState } from 'react';

export type RenderStrategy = 'webgl' | 'canvas' | 'static';
export type DeviceCapability = 'high' | 'medium' | 'low';

export interface DeviceCapabilityResult {
  renderStrategy: RenderStrategy;
  targetFPS: number;
  capability: DeviceCapability;
}

export interface AdaptiveGridSettings {
  opacity: number;
  particleCount: number;
  enableAnimation: boolean;
}

/**
 * Detects device capabilities and returns optimal rendering strategy
 */
export function useDeviceCapability(): DeviceCapabilityResult {
  const [result, setResult] = useState<DeviceCapabilityResult>({
    renderStrategy: 'webgl',
    targetFPS: 60,
    capability: 'high',
  });

  useEffect(() => {
    // Check for WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const hasWebGL = !!gl;

    // Check device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 8; // Default to 8GB if not available

    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 4;

    // Detect mobile/tablet
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    // Determine capability
    let capability: DeviceCapability = 'high';
    let targetFPS = 60;
    let renderStrategy: RenderStrategy = 'webgl';

    if (isMobile || deviceMemory < 4 || cores < 4) {
      capability = 'low';
      targetFPS = 30;
      renderStrategy = hasWebGL ? 'webgl' : 'static';
    } else if (deviceMemory < 8 || cores < 8) {
      capability = 'medium';
      targetFPS = 45;
      renderStrategy = hasWebGL ? 'webgl' : 'canvas';
    } else {
      capability = 'high';
      targetFPS = 60;
      renderStrategy = hasWebGL ? 'webgl' : 'canvas';
    }

    setResult({ renderStrategy, targetFPS, capability });
  }, []);

  return result;
}

/**
 * Returns adaptive grid settings based on device capability
 */
export function useAdaptiveGridSettings(
  capability: DeviceCapability
): AdaptiveGridSettings {
  const [settings, setSettings] = useState<AdaptiveGridSettings>({
    opacity: 0.6,
    particleCount: 100,
    enableAnimation: true,
  });

  useEffect(() => {
    switch (capability) {
      case 'high':
        setSettings({
          opacity: 0.6,
          particleCount: 100,
          enableAnimation: true,
        });
        break;
      case 'medium':
        setSettings({
          opacity: 0.4,
          particleCount: 50,
          enableAnimation: true,
        });
        break;
      case 'low':
        setSettings({
          opacity: 0.2,
          particleCount: 25,
          enableAnimation: false,
        });
        break;
    }
  }, [capability]);

  return settings;
}
