'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  varying vec2 vUv;

  // Noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;

    // Add mouse influence
    vec2 mouseInfluence = (uMouse - 0.5) * 0.3;

    // Create flowing noise
    float noise1 = snoise(uv * 3.0 + uTime * 0.1 + mouseInfluence);
    float noise2 = snoise(uv * 2.0 - uTime * 0.15 + mouseInfluence * 0.5);
    float noise3 = snoise(uv * 4.0 + uTime * 0.08);

    // Combine noises for organic movement
    float combinedNoise = (noise1 + noise2 * 0.5 + noise3 * 0.3) / 1.8;

    // Create gradient zones
    float gradient = uv.x + uv.y + combinedNoise * 0.5;

    // Mix colors based on gradient
    vec3 color1Mix = mix(uColor1, uColor2, smoothstep(0.0, 1.0, gradient));
    vec3 finalColor = mix(color1Mix, uColor3, smoothstep(0.5, 1.5, gradient + combinedNoise * 0.3));

    // Add some brightness variation
    finalColor *= 1.0 + combinedNoise * 0.2;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderMesh({ colors }: { colors: [string, string, string] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(colors[0]) },
      uColor2: { value: new THREE.Color(colors[1]) },
      uColor3: { value: new THREE.Color(colors[2]) },
    }),
    [colors]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;

      // Smooth mouse movement
      mouseRef.current.x += (state.mouse.x * 0.5 + 0.5 - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (state.mouse.y * 0.5 + 0.5 - mouseRef.current.y) * 0.05;
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
    }
  });

  return (
    <mesh ref={meshRef} scale={[2.5, 2.5, 1]}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

interface ShaderBackgroundProps {
  colors?: [string, string, string];
  className?: string;
}

export default function ShaderBackground({
  colors = ['#a855f7', '#06b6d4', '#ec4899'],
  className = ''
}: ShaderBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ShaderMesh colors={colors} />
      </Canvas>
    </div>
  );
}
