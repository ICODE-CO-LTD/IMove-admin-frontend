import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Silk({ 
  speed = 5, 
  scale = 1, 
  color = '#353897', 
  noiseIntensity = 1.5, 
  rotation = 3.5 
}) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Shader material for silk effect
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uNoiseIntensity;
      uniform float uScale;
      uniform float uRotation;
      varying vec2 vUv;

      // Simplex 2D noise
      vec3 permute(vec3 x) {
        return mod(((x*34.0)+1.0)*x, 289.0);
      }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                 -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
          dot(x12.zw,x12.zw)), 0.0);
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
        // Apply rotation
        vec2 rotatedUv = vUv - 0.5;
        float angle = uRotation;
        float s = sin(angle);
        float c = cos(angle);
        rotatedUv = vec2(
          c * rotatedUv.x - s * rotatedUv.y,
          s * rotatedUv.x + c * rotatedUv.y
        ) + 0.5;

        // Create flowing silk pattern
        vec2 uv = rotatedUv * uScale;
        float noise1 = snoise(uv * 2.0 + uTime * 0.1);
        float noise2 = snoise(uv * 3.0 - uTime * 0.15);
        float noise3 = snoise(uv * 4.0 + vec2(uTime * 0.2, -uTime * 0.1));
        
        float pattern = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
        pattern *= uNoiseIntensity;
        
        // Create silk waves
        float wave1 = sin(uv.x * 3.0 + uTime * 0.5 + pattern) * 0.5 + 0.5;
        float wave2 = sin(uv.y * 2.0 - uTime * 0.3 + pattern) * 0.5 + 0.5;
        float silk = (wave1 + wave2) * 0.5;
        
        // Apply color with varying opacity
        float alpha = silk * 0.6 + pattern * 0.4;
        alpha = smoothstep(0.2, 0.8, alpha);
        
        gl_FragColor = vec4(uColor, alpha * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uNoiseIntensity: { value: noiseIntensity },
        uScale: { value: scale },
        uRotation: { value: rotation },
      },
    });

    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Handle resize
    const handleResize = () => {
      const parent = canvasRef.current?.parentElement;
      if (!parent || !rendererRef.current) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      rendererRef.current.setSize(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (material.uniforms) {
        material.uniforms.uTime.value = elapsedTime * (speed / 5);
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      geometry.dispose();
      material.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [speed, scale, color, noiseIntensity, rotation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
