/**
 * ASCII Shader Grid (WebGL)
 *
 * GPU-accelerated ASCII grid using WebGL shaders
 * Renders both small dense and large sparse grids in a single pass
 * Optimized for 60 FPS with <3ms frame times
 * Computational watercolor color gradients
 */

'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';
import { logger } from '@/lib/utils/logger';

export type CharacterSetName = 'minimal' | 'typography' | 'symbols' | 'geometric' | 'dense';

interface ASCIIShaderGridProps {
  opacity?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
  targetFPS?: number;
  smallSpacing?: number;
  mediumSpacing?: number;
  smallOpacity?: number;
  mediumOpacity?: number;
  smallSpeed?: number;
  mediumSpeed?: number;
  characterSet?: CharacterSetName;
}

// Vertex shader - simple passthrough with proper UV mapping
const vertexShader = `
  varying vec2 vUv;
  uniform vec2 uResolution;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader - all the magic happens here
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec3 uColorRed;      // Color for red channel (with chromatic aberration)
  uniform vec3 uColorGreen;    // Color for green channel (centered)
  uniform vec3 uColorBlue;     // Color for blue channel (with chromatic aberration)
  uniform float uSmallSpacing;
  uniform float uMediumSpacing;
  uniform float uSmallOpacity;
  uniform float uMediumOpacity;
  uniform float uSmallSpeed;
  uniform float uMediumSpeed;
  uniform int uNoiseType;
  uniform int uNoiseTypePrev;  // Previous noise type for smooth transitions
  uniform float uNoiseBlend;   // 0 = show prev, 1 = show current
  uniform int uCharacterSet;  // 0=minimal, 1=typography, 2=symbols, 3=geometric, 4=dense
  uniform int uCharacterSetPrev;  // Previous character set for smooth transitions
  uniform float uCharacterBlend;  // 0 = show prev, 1 = show current

  varying vec2 vUv;

  // Hash function for pseudo-random values
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  // Simplex-like noise (optimized)
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f); // Smoothstep

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Fractal Brownian Motion for richer patterns
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  // Multi-sphere noise - organic metaballs with soft edges
  float sphereNoise(vec2 centered, float t) {
    float totalField = 0.0;

    // Create 5 metaballs with growth-oriented animation
    for (int i = 0; i < 5; i++) {
      float fi = float(i);

      // Use hash to generate pseudo-random but consistent properties
      float seed = fi * 7.123;
      float sizeVariation = hash(vec2(seed, 1.0));
      float speedVariation = hash(vec2(seed, 2.0));
      float posVariation = hash(vec2(seed, 3.0));
      float phaseOffset = hash(vec2(seed, 4.0)) * 6.28;

      // Growth-oriented properties - metaballs expand and contract
      float baseRadius = 0.15 + sizeVariation * 0.25; // 0.15 to 0.4
      float growthSpeed = 0.3 + speedVariation * 0.4; // 0.3 to 0.7

      // Radial pulsing - metaballs grow and shrink from their center
      float growthPhase = sin(t * growthSpeed + phaseOffset);
      float growth = growthPhase * 0.15; // Pulse ±0.15
      float activeRadius = baseRadius + growth;

      // Position metaballs in a more organic pattern
      // Using golden ratio for natural distribution
      float angle = phaseOffset + fi * 2.4; // Golden angle approximation
      float distFromOrigin = 0.2 + posVariation * 0.3; // 0.2 to 0.5 from center

      // Add slight radial breathing - everything pulses from center
      float radialPulse = sin(t * 0.2 + fi * 1.0) * 0.1;
      float activeDistFromOrigin = distFromOrigin + radialPulse;

      vec2 center = vec2(
        cos(angle) * activeDistFromOrigin,
        sin(angle) * activeDistFromOrigin
      );

      vec2 offset = centered - center;
      float dist = length(offset);

      // Stable metaball field formula: r^2 / (d^2 + r^2)
      // This keeps values bounded between 0 and 1, preventing numerical instability
      float radiusSq = activeRadius * activeRadius;
      float distSq = dist * dist;
      float field = radiusSq / (distSq + radiusSq * 0.5);

      // Apply smooth falloff to reduce harsh edges
      field = smoothstep(0.0, 1.0, field);

      totalField += field;
    }

    // Normalize and apply smooth threshold
    // Scale factor adjusted for new bounded field values
    float density = totalField * 0.35;
    density = smoothstep(0.2, 1.5, density);

    return clamp(density, 0.3, 1.0);
  }

  // Torus noise - pulsing organic rings (no rotation)
  float torusNoise(vec2 centered, float t) {
    float angle = atan(centered.y, centered.x);
    float radius = length(centered);

    // Breathing torus - radius pulses in and out
    float breathe = sin(t * 0.4) * 0.1;
    float torusRadius = 0.3 + breathe;

    // Tube radius also pulses
    float tubePulse = sin(t * 0.5 + 1.57) * 0.03; // Phase offset for variety
    float tubeRadius = 0.12 + tubePulse;

    // Organic waviness around the ring (evolves, not rotates)
    float wavePhase = sin(t * 0.3);
    float modulation = sin(angle * 6.0 + wavePhase) * 0.04;

    float distFromTorus = abs(radius - torusRadius);
    float torus = 1.0 - (distFromTorus - modulation) / tubeRadius;

    // Add radial pulsing gradient from center
    float radialPulse = sin(radius * 4.0 + t * 0.6) * 0.1;
    torus += radialPulse;

    // Add base layer so it's never completely empty
    return max(0.3, torus);
  }

  // Wave noise - interference patterns (NO directional motion)
  float waveNoise(vec2 centered, float t) {
    // Time modulates frequency/amplitude instead of creating scrolling
    float freq1 = 3.0 + sin(t * 0.3) * 0.5;
    float freq2 = 3.0 + cos(t * 0.25) * 0.5;

    // Standing wave patterns that pulse in place
    float wave1 = sin(centered.x * freq1) * cos(centered.y * freq2);
    float wave2 = sin((centered.x + centered.y) * 2.5 + sin(t * 0.4) * 0.5);

    return (wave1 + wave2) * 0.25 + 0.5;
  }

  // Terrain-like elevation (organic evolution, no scrolling)
  float terrainNoise(vec2 centered, float t) {
    // Use time to modulate the noise space instead of translating it
    // This creates organic evolution without directional motion

    // Layer 1: Large scale pulsing (like breathing)
    vec2 p1 = centered * 0.6;
    float scale1 = 1.0 + sin(t * 0.2) * 0.3; // Breathing scale
    float n1 = fbm(p1 * scale1) * 0.4;

    // Layer 2: Medium detail that rotates slowly
    float angle = t * 0.1; // Very slow rotation
    vec2 p2 = vec2(
      centered.x * cos(angle) - centered.y * sin(angle),
      centered.x * sin(angle) + centered.y * cos(angle)
    ) * 1.0;
    float n2 = fbm(p2) * 0.3;

    // Layer 3: Fine detail that pulses
    float phase = sin(t * 0.3);
    vec2 p3 = centered * (1.5 + phase * 0.2);
    float n3 = noise(p3) * 0.2;

    // Combine layers
    float terrain = n1 + n2 + n3 + 0.2;

    // Smooth and add contrast
    terrain = smoothstep(0.2, 0.8, terrain);

    return max(0.35, terrain);
  }

  // Hexagonal grid overlay - subtle geometric accent
  float hexagonalGrid(vec2 p) {
    // Hexagonal tiling
    const vec2 s = vec2(1.732, 1.5); // sqrt(3), 1.5
    vec2 h = vec2(p.x * s.x, p.y * s.y);
    vec2 f = fract(h);
    h = floor(h);

    // Get hex center
    vec2 center = vec2(0.5);
    if (f.x + f.y > 1.0) {
      f = 1.0 - f;
      h += 1.0;
    }

    // Distance to hex edge (creates subtle grid lines)
    float dist = length(f - center);
    return smoothstep(0.45, 0.48, dist); // Very subtle edge highlight
  }

  // Particle dots that follow the flow - adds sparkle
  float flowParticles(vec2 p, float t) {
    // Create flowing particle positions using hash
    float particles = 0.0;
    for (int i = 0; i < 3; i++) {
      vec2 particlePos = vec2(
        hash(vec2(float(i) * 7.123 + t * 0.3, 0.0)),
        hash(vec2(0.0, float(i) * 5.456 + t * 0.3))
      ) - 0.5;

      float dist = length(p - particlePos);
      particles += smoothstep(0.05, 0.02, dist);
    }
    return particles * 0.3; // Subtle sparkle
  }

  // Get noise value for a specific type
  float getNoiseForType(vec2 centered, float t, int type) {
    if (type == 0) return sphereNoise(centered, t);
    else if (type == 1) return torusNoise(centered, t);
    else if (type == 2) return waveNoise(centered, t);
    else if (type == 3) return terrainNoise(centered, t);
    return 0.5;
  }

  // Get noise value with smooth transitions between types
  float getNoise(vec2 centered, float t, int typeCurrent, int typePrev, float blend) {
    // Get noise from both current and previous types
    float noiseCurrent = getNoiseForType(centered, t, typeCurrent);
    float noisePrev = getNoiseForType(centered, t, typePrev);

    // Smooth blend between them
    float blendSmooth = smoothstep(0.0, 1.0, blend);
    float baseNoise = mix(noisePrev, noiseCurrent, blendSmooth);

    // Add subtle particle sparkles (no geometric grid overlay)
    float particles = flowParticles(centered, t);

    // Pure organic noise with subtle sparkles
    return baseNoise + particles * 0.15;
  }

  // ASCII character density - returns alpha for character
  // Supports 5 character sets with 5 density levels each (simplified)
  float asciiDensity(vec2 gridCoord, float density, int charSet) {
    // Remap density to exclude the darkest characters (cap at 0.75 instead of 1.0)
    // This prevents @ and # from appearing, keeping things lighter
    density = density * 0.75;

    vec2 cellPos = fract(gridCoord);
    vec2 center = vec2(0.5);
    float distFromCenter = length(cellPos - center);
    float pattern = 0.0;

    // Character Set 0: Minimal (. · ° • @) - Clean smooth gradient (optimal)
    if (charSet == 0) {
      if (density < 0.2) {
        // . tiny dot
        pattern = smoothstep(0.45, 0.38, distFromCenter) * 0.3;
      } else if (density < 0.4) {
        // · small dot
        pattern = smoothstep(0.42, 0.32, distFromCenter) * 0.6;
      } else if (density < 0.6) {
        // ° medium ring
        pattern = smoothstep(0.38, 0.28, distFromCenter) * 0.8;
      } else if (density < 0.8) {
        // • solid dot
        pattern = smoothstep(0.4, 0.28, distFromCenter);
      } else {
        // @ dense circle with center
        float outerCircle = smoothstep(0.42, 0.32, distFromCenter);
        float innerDot = smoothstep(0.12, 0.08, distFromCenter);
        pattern = max(outerCircle, innerDot);
      }
    }
    // Character Set 1: Typography (' ' • – —) - Simplified punctuation
    else if (charSet == 1) {
      if (density < 0.2) {
        // ' single quote (tiny mark)
        pattern = smoothstep(0.45, 0.4, abs(cellPos.y - 0.7)) * smoothstep(0.46, 0.42, abs(cellPos.x - 0.5)) * 0.3;
      } else if (density < 0.4) {
        // ' curly quote (small dot)
        pattern = smoothstep(0.42, 0.35, length(cellPos - vec2(0.5, 0.65))) * 0.6;
      } else if (density < 0.6) {
        // • bullet (medium dot)
        pattern = smoothstep(0.38, 0.28, distFromCenter) * 0.8;
      } else if (density < 0.8) {
        // – en dash (short line)
        pattern = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5)) * smoothstep(0.35, 0.25, abs(cellPos.x - 0.5));
      } else {
        // — em dash (long line)
        pattern = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5)) * smoothstep(0.42, 0.32, abs(cellPos.x - 0.5));
      }
    }
    // Character Set 2: Symbols (° ± × § ©) - Clean mathematical symbols
    else if (charSet == 2) {
      if (density < 0.2) {
        // ° degree (tiny ring)
        float ring = abs(distFromCenter - 0.15);
        pattern = smoothstep(0.08, 0.05, ring) * 0.3;
      } else if (density < 0.4) {
        // ± plus-minus (simple cross with underline)
        float horiz = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5)) * smoothstep(0.32, 0.22, abs(cellPos.x - 0.5));
        float vert = smoothstep(0.12, 0.08, abs(cellPos.x - 0.5)) * smoothstep(0.25, 0.15, abs(cellPos.y - 0.5));
        pattern = max(horiz, vert) * 0.6;
      } else if (density < 0.6) {
        // × multiplication (diagonal cross)
        float diag1 = smoothstep(0.14, 0.1, abs(cellPos.x - cellPos.y));
        float diag2 = smoothstep(0.14, 0.1, abs(cellPos.x - (1.0 - cellPos.y)));
        pattern = max(diag1, diag2) * 0.8;
      } else if (density < 0.8) {
        // § section (simple double curve)
        float top = smoothstep(0.28, 0.2, length(cellPos - vec2(0.5, 0.62)));
        float bottom = smoothstep(0.28, 0.2, length(cellPos - vec2(0.5, 0.38)));
        pattern = max(top, bottom);
      } else {
        // © copyright (circle with C)
        float ring = abs(distFromCenter - 0.32);
        pattern = smoothstep(0.08, 0.05, ring);
      }
    }
    // Character Set 3: Geometric (+ × ─ ┼ ▓) - Clean structural lines
    else if (charSet == 3) {
      if (density < 0.2) {
        // + plus (thin cross)
        float horiz = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5)) * smoothstep(0.3, 0.2, abs(cellPos.x - 0.5));
        float vert = smoothstep(0.12, 0.08, abs(cellPos.x - 0.5)) * smoothstep(0.3, 0.2, abs(cellPos.y - 0.5));
        pattern = max(horiz, vert) * 0.3;
      } else if (density < 0.4) {
        // × multiplication (diagonal lines)
        float diag1 = smoothstep(0.14, 0.1, abs(cellPos.x - cellPos.y));
        float diag2 = smoothstep(0.14, 0.1, abs(cellPos.x - (1.0 - cellPos.y)));
        pattern = max(diag1, diag2) * 0.6;
      } else if (density < 0.6) {
        // ─ horizontal line
        pattern = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5)) * 0.8;
      } else if (density < 0.8) {
        // ┼ cross (thick intersection)
        float horiz = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5));
        float vert = smoothstep(0.12, 0.08, abs(cellPos.x - 0.5));
        pattern = max(horiz, vert);
      } else {
        // ◇ diamond outline (rotated square)
        vec2 diamondPos = cellPos - vec2(0.5, 0.5);
        float diamondDist = abs(diamondPos.x) + abs(diamondPos.y);
        float diamondRing = abs(diamondDist - 0.35);
        pattern = smoothstep(0.1, 0.06, diamondRing);
      }
    }
    // Character Set 4: Dense (· • # § @) - Heavy consistent characters
    else if (charSet == 4) {
      if (density < 0.2) {
        // · small dot
        pattern = smoothstep(0.42, 0.35, distFromCenter) * 0.3;
      } else if (density < 0.4) {
        // • medium dot
        pattern = smoothstep(0.38, 0.28, distFromCenter) * 0.6;
      } else if (density < 0.6) {
        // # hash (grid)
        float h = smoothstep(0.12, 0.08, abs(cellPos.y - 0.5));
        float v = smoothstep(0.12, 0.08, abs(cellPos.x - 0.5));
        pattern = max(h, v) * 0.8;
      } else if (density < 0.8) {
        // § section (double dots)
        float top = smoothstep(0.28, 0.2, length(cellPos - vec2(0.5, 0.62)));
        float bottom = smoothstep(0.28, 0.2, length(cellPos - vec2(0.5, 0.38)));
        pattern = max(top, bottom);
      } else {
        // @ solid circle
        pattern = smoothstep(0.42, 0.3, distFromCenter);
      }
    }

    return pattern;
  }

  // Blend between two character sets for smooth transitions
  float asciiDensityBlended(vec2 gridCoord, float density, int charSetCurrent, int charSetPrev, float blend) {
    float patternCurrent = asciiDensity(gridCoord, density, charSetCurrent);
    float patternPrev = asciiDensity(gridCoord, density, charSetPrev);
    float blendSmooth = smoothstep(0.0, 1.0, blend);
    return mix(patternPrev, patternCurrent, blendSmooth);
  }

  void main() {
    // Convert to centered coordinates
    vec2 centered = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    // Noise-based chromatic aberration - organic distortion
    // Sample noise to get distortion direction and strength
    float noiseX = noise(vUv * 8.0 + uTime * 0.05);
    float noiseY = noise(vUv * 8.0 + vec2(100.0, 0.0) + uTime * 0.05);

    // Convert noise to directional offset (-1 to 1 range)
    vec2 noiseOffset = vec2(noiseX, noiseY) * 2.0 - 1.0;

    // Base aberration strength (3 pixels) + noise modulation
    float baseAberration = 3.0;
    vec2 aberrationStrength = (baseAberration / uResolution) * (1.0 + noiseOffset * 0.5);

    // === RED CHANNEL (offset in noise-based direction) ===
    vec2 uvRed = vUv - aberrationStrength;
    vec2 centeredRed = (uvRed - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 smallGridRed = uvRed * uResolution / uSmallSpacing;
    float smallDensityRed = getNoise(centeredRed, uTime * uSmallSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    float smallPatternRed = asciiDensityBlended(smallGridRed, smallDensityRed, uCharacterSet, uCharacterSetPrev, uCharacterBlend);

    vec2 mediumGridRed = uvRed * uResolution / uMediumSpacing;
    // Use same organic noise as small grid, but with scale/speed variation
    float mediumDensityRed = getNoise(centeredRed * 1.2, uTime * uMediumSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    // Medium grid always uses geometric character set (3) for structural accent
    float mediumPatternRed = asciiDensityBlended(mediumGridRed, mediumDensityRed * 0.7, 3, 3, 1.0);

    // === GREEN CHANNEL (centered, no offset) ===
    vec2 smallGrid = vUv * uResolution / uSmallSpacing;
    float smallDensity = getNoise(centered, uTime * uSmallSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    float smallPattern = asciiDensityBlended(smallGrid, smallDensity, uCharacterSet, uCharacterSetPrev, uCharacterBlend);

    vec2 mediumGrid = vUv * uResolution / uMediumSpacing;
    // Use same organic noise as small grid, but with scale/speed variation
    float mediumDensity = getNoise(centered * 1.2, uTime * uMediumSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    // Medium grid always uses geometric character set (3) for structural accent
    float mediumPattern = asciiDensityBlended(mediumGrid, mediumDensity * 0.7, 3, 3, 1.0);

    // === BLUE CHANNEL (offset in opposite noise-based direction) ===
    vec2 uvBlue = vUv + aberrationStrength;
    vec2 centeredBlue = (uvBlue - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    vec2 smallGridBlue = uvBlue * uResolution / uSmallSpacing;
    float smallDensityBlue = getNoise(centeredBlue, uTime * uSmallSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    float smallPatternBlue = asciiDensityBlended(smallGridBlue, smallDensityBlue, uCharacterSet, uCharacterSetPrev, uCharacterBlend);

    vec2 mediumGridBlue = uvBlue * uResolution / uMediumSpacing;
    // Use same organic noise as small grid, but with scale/speed variation
    float mediumDensityBlue = getNoise(centeredBlue * 1.2, uTime * uMediumSpeed, uNoiseType, uNoiseTypePrev, uNoiseBlend);
    // Medium grid always uses geometric character set (3) for structural accent
    float mediumPatternBlue = asciiDensityBlended(mediumGridBlue, mediumDensityBlue * 0.7, 3, 3, 1.0);

    // Color interpolation per channel
    vec3 color1MixRed = mix(uColorRed, uColorGreen, smallDensityRed);
    vec3 color2MixRed = mix(uColorGreen, uColorBlue, mediumDensityRed);

    vec3 color1Mix = mix(uColorRed, uColorGreen, smallDensity);
    vec3 color2Mix = mix(uColorGreen, uColorBlue, mediumDensity);

    vec3 color1MixBlue = mix(uColorRed, uColorGreen, smallDensityBlue);
    vec3 color2MixBlue = mix(uColorGreen, uColorBlue, mediumDensityBlue);

    // Boost saturation - move away from gray
    vec3 gray = vec3(0.5);
    float saturationBoost = 1.8; // Increase saturation by 80%
    color1MixRed = mix(gray, color1MixRed, saturationBoost);
    color2MixRed = mix(gray, color2MixRed, saturationBoost);
    color1Mix = mix(gray, color1Mix, saturationBoost);
    color2Mix = mix(gray, color2Mix, saturationBoost);
    color1MixBlue = mix(gray, color1MixBlue, saturationBoost);
    color2MixBlue = mix(gray, color2MixBlue, saturationBoost);

    // Calculate alpha per channel
    float smallAlphaRed = smallPatternRed * (uSmallOpacity + smallDensityRed * 0.4);
    smallAlphaRed = max(smallAlphaRed, smallPatternRed * 0.3);
    float mediumAlphaRed = mediumPatternRed * (uMediumOpacity + mediumDensityRed * 0.6);
    mediumAlphaRed = max(mediumAlphaRed, mediumPatternRed * 0.2);

    float smallAlpha = smallPattern * (uSmallOpacity + smallDensity * 0.4);
    smallAlpha = max(smallAlpha, smallPattern * 0.3);
    float mediumAlpha = mediumPattern * (uMediumOpacity + mediumDensity * 0.6);
    mediumAlpha = max(mediumAlpha, mediumPattern * 0.2);

    float smallAlphaBlue = smallPatternBlue * (uSmallOpacity + smallDensityBlue * 0.4);
    smallAlphaBlue = max(smallAlphaBlue, smallPatternBlue * 0.3);
    float mediumAlphaBlue = mediumPatternBlue * (uMediumOpacity + mediumDensityBlue * 0.6);
    mediumAlphaBlue = max(mediumAlphaBlue, mediumPatternBlue * 0.2);

    // Layer composition per channel
    float mediumStrengthRed = smoothstep(0.2, 0.6, mediumAlphaRed);
    float mediumStrength = smoothstep(0.2, 0.6, mediumAlpha);
    float mediumStrengthBlue = smoothstep(0.2, 0.6, mediumAlphaBlue);

    // Final color with chromatic aberration - separate RGB channels
    float finalR = mix(color1MixRed.r, color2MixRed.r, mediumStrengthRed);
    float finalG = mix(color1Mix.g, color2Mix.g, mediumStrength);
    float finalB = mix(color1MixBlue.b, color2MixBlue.b, mediumStrengthBlue);

    vec3 finalColor = vec3(finalR, finalG, finalB);

    // Alpha: average of all channels
    float finalAlpha = (max(smallAlphaRed * 0.8, mediumAlphaRed) +
                        max(smallAlpha * 0.8, mediumAlpha) +
                        max(smallAlphaBlue * 0.8, mediumAlphaBlue)) / 3.0;
    finalAlpha = max(finalAlpha, 0.1); // Global minimum alpha floor

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

// Shader mesh component that handles animation
function ASCIIShaderMesh({
  colorTheme,
  animated,
  targetFPS = 60,
  smallSpacing = 12,
  mediumSpacing = 24,
  smallOpacity = 0.6,
  mediumOpacity = 0.4,
  smallSpeed = 0.5,
  mediumSpeed = 1.5,
  characterSet = 'minimal'
}: {
  colorTheme?: WatercolorTheme;
  animated: boolean;
  targetFPS: number;
  smallSpacing?: number;
  mediumSpacing?: number;
  smallOpacity?: number;
  mediumOpacity?: number;
  smallSpeed?: number;
  mediumSpeed?: number;
  characterSet?: CharacterSetName;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  const lastFrameTime = useRef(0);
  const noiseTypeRef = useRef(0);
  const initialTimeOffset = useRef(Math.random() * 100 + 50); // Start 50-150 seconds in

  // Convert hex color to RGB vec3
  const hexToVec3 = (hex: string): THREE.Vector3 => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return new THREE.Vector3(r, g, b);
  };

  // Convert character set name to index for shader
  const characterSetToIndex = (name: CharacterSetName): number => {
    const mapping: Record<CharacterSetName, number> = {
      minimal: 0,
      typography: 1,
      symbols: 2,
      geometric: 3,
      dense: 4
    };
    return mapping[name];
  };

  // Create shader material with uniforms
  const shaderMaterial = useMemo(() => {
    const colors = colorTheme?.colors || ['#8b5cf6', '#6366f1', '#3b82f6'];

    if (process.env.NODE_ENV === 'development') {
      logger.log('[ASCIIShaderGrid] Colors:', colors);
    }

    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
        uColorRed: { value: hexToVec3(colors[0]) },
        uColorGreen: { value: hexToVec3(colors[1]) },
        uColorBlue: { value: hexToVec3(colors[2] || colors[1]) },
        uSmallSpacing: { value: smallSpacing },
        uMediumSpacing: { value: mediumSpacing },
        uSmallOpacity: { value: smallOpacity },
        uMediumOpacity: { value: mediumOpacity },
        uSmallSpeed: { value: smallSpeed },
        uMediumSpeed: { value: mediumSpeed },
        uNoiseType: { value: 0 },
        uNoiseTypePrev: { value: 0 },
        uNoiseBlend: { value: 1.0 },
        uCharacterSet: { value: characterSetToIndex(characterSet) },
        uCharacterSetPrev: { value: characterSetToIndex(characterSet) },
        uCharacterBlend: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [colorTheme, size.width, size.height, smallSpacing, mediumSpacing, smallOpacity, mediumOpacity, smallSpeed, mediumSpeed, characterSet]);

  // Update resolution on resize
  useEffect(() => {
    if (shaderMaterial.uniforms.uResolution) {
      shaderMaterial.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size.width, size.height, shaderMaterial]);

  // Cycle through noise functions and character sets with smooth transitions
  useEffect(() => {
    if (!animated) return;

    const stableDuration = 8000; // 8 seconds stable
    const fadeDuration = 2000;   // 2 seconds fade
    const totalDuration = stableDuration + fadeDuration;

    let startTime = Date.now();
    let currentType = noiseTypeRef.current;
    let nextType = (currentType + 1) % 4;

    // Character set cycling sequence: minimal -> symbols -> geometric -> dense -> minimal
    const characterSetSequence = [0, 2, 3, 4]; // 0=minimal, 2=symbols, 3=geometric, 4=dense
    let currentCharSetIndex = 0;
    let currentCharSet = characterSetSequence[currentCharSetIndex];
    let nextCharSet = characterSetSequence[(currentCharSetIndex + 1) % characterSetSequence.length];

    // Set initial state
    if (shaderMaterial.uniforms.uNoiseType) {
      shaderMaterial.uniforms.uNoiseType.value = currentType;
    }
    if (shaderMaterial.uniforms.uNoiseTypePrev) {
      shaderMaterial.uniforms.uNoiseTypePrev.value = currentType;
    }
    if (shaderMaterial.uniforms.uNoiseBlend) {
      shaderMaterial.uniforms.uNoiseBlend.value = 1.0;
    }
    if (shaderMaterial.uniforms.uCharacterSet) {
      shaderMaterial.uniforms.uCharacterSet.value = currentCharSet;
    }
    if (shaderMaterial.uniforms.uCharacterSetPrev) {
      shaderMaterial.uniforms.uCharacterSetPrev.value = currentCharSet;
    }
    if (shaderMaterial.uniforms.uCharacterBlend) {
      shaderMaterial.uniforms.uCharacterBlend.value = 1.0;
    }

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed < stableDuration) {
        // Stable phase - show current types fully
        if (shaderMaterial.uniforms.uNoiseBlend) {
          shaderMaterial.uniforms.uNoiseBlend.value = 1.0;
        }
        if (shaderMaterial.uniforms.uCharacterBlend) {
          shaderMaterial.uniforms.uCharacterBlend.value = 1.0;
        }
      } else {
        // Fade phase - blend from current to next
        const fadeProgress = (elapsed - stableDuration) / fadeDuration;

        if (fadeProgress >= 1.0) {
          // Transition complete - update to next types
          currentType = nextType;
          nextType = (currentType + 1) % 4;
          startTime = Date.now();

          noiseTypeRef.current = currentType;

          // Update character set
          currentCharSetIndex = (currentCharSetIndex + 1) % characterSetSequence.length;
          currentCharSet = characterSetSequence[currentCharSetIndex];
          nextCharSet = characterSetSequence[(currentCharSetIndex + 1) % characterSetSequence.length];

          if (shaderMaterial.uniforms.uNoiseType) {
            shaderMaterial.uniforms.uNoiseType.value = currentType;
          }
          if (shaderMaterial.uniforms.uNoiseTypePrev) {
            shaderMaterial.uniforms.uNoiseTypePrev.value = currentType;
          }
          if (shaderMaterial.uniforms.uNoiseBlend) {
            shaderMaterial.uniforms.uNoiseBlend.value = 1.0;
          }
          if (shaderMaterial.uniforms.uCharacterSet) {
            shaderMaterial.uniforms.uCharacterSet.value = currentCharSet;
          }
          if (shaderMaterial.uniforms.uCharacterSetPrev) {
            shaderMaterial.uniforms.uCharacterSetPrev.value = currentCharSet;
          }
          if (shaderMaterial.uniforms.uCharacterBlend) {
            shaderMaterial.uniforms.uCharacterBlend.value = 1.0;
          }
        } else {
          // Mid-transition - update blend values
          if (shaderMaterial.uniforms.uNoiseTypePrev) {
            shaderMaterial.uniforms.uNoiseTypePrev.value = currentType;
          }
          if (shaderMaterial.uniforms.uNoiseType) {
            shaderMaterial.uniforms.uNoiseType.value = nextType;
          }
          if (shaderMaterial.uniforms.uNoiseBlend) {
            shaderMaterial.uniforms.uNoiseBlend.value = fadeProgress;
          }
          if (shaderMaterial.uniforms.uCharacterSetPrev) {
            shaderMaterial.uniforms.uCharacterSetPrev.value = currentCharSet;
          }
          if (shaderMaterial.uniforms.uCharacterSet) {
            shaderMaterial.uniforms.uCharacterSet.value = nextCharSet;
          }
          if (shaderMaterial.uniforms.uCharacterBlend) {
            shaderMaterial.uniforms.uCharacterBlend.value = fadeProgress;
          }
        }
      }
    }, 16); // Update every ~16ms (60fps)

    return () => clearInterval(interval);
  }, [animated, shaderMaterial]);

  // Animation loop
  useFrame((state) => {
    if (!animated || !meshRef.current) return;

    // FPS throttling
    const frameInterval = 1000 / targetFPS;
    const now = state.clock.elapsedTime * 1000;

    if (now - lastFrameTime.current < frameInterval) return;
    lastFrameTime.current = now;

    // Update time uniform with initial offset so it starts in an interesting state
    if (shaderMaterial.uniforms.uTime) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime + initialTimeOffset.current;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[size.width, size.height]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
}

// Main component
export function ASCIIShaderGrid({
  opacity = 0.08,
  animated = true,
  colorTheme,
  targetFPS = 30,
  smallSpacing = 12,
  mediumSpacing = 24,
  smallOpacity = 0.6,
  mediumOpacity = 0.4,
  smallSpeed = 0.5,
  mediumSpeed = 1.5,
  characterSet = 'minimal'
}: ASCIIShaderGridProps) {
  const [isClient, setIsClient] = useState(false);
  const [contextLost, setContextLost] = useState(false);

  // Only render on client to avoid SSR issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle WebGL context loss/restoration
  useEffect(() => {
    if (!isClient) return;

    // Wait for canvas to be mounted
    const timer = setTimeout(() => {
      const canvas = document.querySelector('canvas[data-engine="three.js"]');
      if (!canvas) {
        logger.warn('[ASCIIShaderGrid] Canvas not found for context loss handling');
        return;
      }

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        logger.warn('[ASCIIShaderGrid] WebGL context lost - will attempt recovery');
        setContextLost(true);
      };

      const handleContextRestored = () => {
        logger.log('[ASCIIShaderGrid] WebGL context restored - recovering render');
        setContextLost(false);
        // Force component re-mount to rebuild WebGL context
        setIsClient(false);
        setTimeout(() => setIsClient(true), 0);
      };

      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);

      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient]);

  if (!isClient) {
    return <div className="absolute inset-0 pointer-events-none" aria-hidden="true" />;
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
      role="presentation"
      aria-label="Animated ASCII grid background"
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 100], near: 0.1, far: 2000 }}
        gl={{
          alpha: true,
          antialias: false, // Disable for performance
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2]} // Limit to 2x for performance
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <ASCIIShaderMesh
          colorTheme={colorTheme}
          animated={animated}
          targetFPS={targetFPS}
          smallSpacing={smallSpacing}
          mediumSpacing={mediumSpacing}
          smallOpacity={smallOpacity}
          mediumOpacity={mediumOpacity}
          smallSpeed={smallSpeed}
          mediumSpeed={mediumSpeed}
          characterSet={characterSet}
        />
      </Canvas>
    </div>
  );
}
