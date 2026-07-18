import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { AdditiveBlending } from "three";

function Particles({ count }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < values.length; index += 3) {
      const seed = index / 3 + 1;
      const scatter = (factor, offset) => {
        const value = Math.sin(seed * factor) * offset;
        return value - Math.floor(value);
      };

      values[index] = (scatter(12.9898, 43758.5453) - 0.5) * 10;
      values[index + 1] = (scatter(78.233, 12345.6789) - 0.5) * 8;
      values[index + 2] = (scatter(39.425, 24680.1357) - 0.5) * 5;
    }

    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.018;
    pointsRef.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#b9f7ff"
        size={0.022}
        sizeAttenuation
        transparent
        opacity={0.48}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

function SceneContent({ enableParallax, particleCount }) {
  const groupRef = useRef(null);
  const torusRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enableParallax) return undefined;

    const onPointerMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [enableParallax]);

  useFrame((state, delta) => {
    if (!groupRef.current || !torusRef.current) return;

    const time = state.clock.elapsedTime;
    groupRef.current.rotation.y += (mouse.current.x * 0.16 - groupRef.current.rotation.y) * delta * 1.2;
    groupRef.current.rotation.x += (-mouse.current.y * 0.1 - groupRef.current.rotation.x) * delta * 1.2;
    groupRef.current.position.y = Math.sin(time * 0.55) * 0.14;
    torusRef.current.rotation.z += delta * 0.1;
    torusRef.current.rotation.x = time * 0.08;
  });

  return (
    <group ref={groupRef} position={[1.3, 0, 0]}>
      <ambientLight intensity={0.45} color="#b6f7ff" />
      <directionalLight position={[3, 3, 4]} intensity={1.25} color="#b9f7ff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.7} color="#6d62ff" />
      <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.28}>
        <mesh>
          <sphereGeometry args={[1.36, 24, 24]} />
          <meshStandardMaterial color="#123a49" emissive="#16718a" emissiveIntensity={0.52} roughness={0.3} metalness={0.66} transparent opacity={0.8} />
        </mesh>
        <mesh scale={1.08}>
          <sphereGeometry args={[1.36, 24, 24]} />
          <meshBasicMaterial color="#70eaff" transparent opacity={0.035} depthWrite={false} blending={AdditiveBlending} />
        </mesh>
      </Float>
      <mesh ref={torusRef} rotation={[1.1, 0.35, 0]}>
        <torusGeometry args={[2.05, 0.025, 8, 72]} />
        <meshBasicMaterial color="#9af2ff" transparent opacity={0.46} wireframe />
      </mesh>
      <Particles count={particleCount} />
    </group>
  );
}

export default function HeroScene() {
  const [documentVisible, setDocumentVisible] = useState(() => !document.hidden);
  const [compact, setCompact] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [finePointer, setFinePointer] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  useEffect(() => {
    const onVisibilityChange = () => setDocumentVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 767px)");
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncViewport = () => setCompact(compactQuery.matches);
    const syncPointer = () => setFinePointer(pointerQuery.matches);

    compactQuery.addEventListener("change", syncViewport);
    pointerQuery.addEventListener("change", syncPointer);
    return () => {
      compactQuery.removeEventListener("change", syncViewport);
      pointerQuery.removeEventListener("change", syncPointer);
    };
  }, []);

  return (
    <div className="hero__scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 42 }}
        dpr={compact ? [1, 1] : [1, 1.5]}
        frameloop={documentVisible ? "always" : "never"}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <SceneContent enableParallax={finePointer} particleCount={compact ? 96 : 180} />
      </Canvas>
    </div>
  );
}
