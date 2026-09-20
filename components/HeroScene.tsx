"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ----------------------------------------------------------------
   GEOMETRÍAS
   ---------------------------------------------------------------- */

/** Engranaje: perfil 2D con dientes trapezoidales + agujero central, extruido. */
function createGearGeometry({
  teeth = 14,
  outer = 1,
  inner = 0.82,
  hole = 0.32,
  depth = 0.28,
}: {
  teeth?: number;
  outer?: number;
  inner?: number;
  hole?: number;
  depth?: number;
}) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts: [number, number][] = [
      [a, inner],
      [a + step * 0.18, outer],
      [a + step * 0.5, outer],
      [a + step * 0.68, inner],
    ];

    pts.forEach(([ang, r], j) => {
      const x = Math.cos(ang) * r;
      const y = Math.sin(ang) * r;
      if (i === 0 && j === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    });
  }
  shape.closePath();

  const holePath = new THREE.Path();
  holePath.absarc(0, 0, hole, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.035,
    bevelSize: 0.035,
    bevelSegments: 3,
    curveSegments: 12,
  });
  geometry.center();
  return geometry;
}

/* ----------------------------------------------------------------
   MATERIALES
   ---------------------------------------------------------------- */

const steel = { color: "#cfd5de", metalness: 1, roughness: 0.28 };
const darkSteel = { color: "#6b7280", metalness: 1, roughness: 0.4 };
const blue = { color: "#4978de", metalness: 0.85, roughness: 0.32 };
const gold = { color: "#eecd5f", metalness: 0.95, roughness: 0.25 };

/* ----------------------------------------------------------------
   PIEZAS
   ---------------------------------------------------------------- */

function Gear({
  teeth,
  radius,
  depth,
  speed,
  material,
  ...props
}: {
  teeth: number;
  radius: number;
  depth: number;
  speed: number;
  material: typeof steel;
} & React.ComponentProps<"group">) {
  const ref = useRef<THREE.Mesh>(null);
  const geometry = useMemo(
    () =>
      createGearGeometry({
        teeth,
        outer: radius,
        inner: radius * 0.82,
        hole: radius * 0.3,
        depth,
      }),
    [teeth, radius, depth],
  );

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * speed;
  });

  return (
    <group {...props}>
      <mesh ref={ref} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial {...material} />
      </mesh>
    </group>
  );
}

function HexNut(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      {/* Cuerpo hexagonal */}
      <mesh castShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.36, 6]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {/* Rosca interior */}
      <mesh>
        <cylinderGeometry args={[0.28, 0.28, 0.4, 32, 1, true]} />
        <meshStandardMaterial {...darkSteel} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.03, 8, 32]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
    </group>
  );
}

function Bolt(props: React.ComponentProps<"group">) {
  return (
    <group {...props}>
      {/* Cabeza */}
      <mesh position={[0, 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.3, 6]} />
        <meshStandardMaterial {...blue} />
      </mesh>
      {/* Vástago */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1.1, 24]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      {/* Rosca (anillos) */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[0, -0.5 + i * 0.13, 0]}>
          <torusGeometry args={[0.2, 0.022, 6, 28]} />
          <meshStandardMaterial {...darkSteel} />
        </mesh>
      ))}
    </group>
  );
}

function Bearing(props: React.ComponentProps<"group">) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z -= delta * 0.6;
  });

  return (
    <group {...props}>
      <mesh>
        <torusGeometry args={[0.9, 0.16, 16, 64]} />
        <meshStandardMaterial {...steel} />
      </mesh>
      <mesh>
        <torusGeometry args={[0.5, 0.12, 16, 64]} />
        <meshStandardMaterial {...darkSteel} />
      </mesh>
      {/* Bolas */}
      <group ref={ref}>
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.7, Math.sin(a) * 0.7, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial {...gold} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ----------------------------------------------------------------
   RIG: parallax con el mouse + rotación con el scroll
   ---------------------------------------------------------------- */

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // En pantallas angostas centramos y achicamos el conjunto
  const isNarrow = viewport.width < 7;
  const scale = isNarrow ? 0.5 : 0.85;
  const baseX = isNarrow ? viewport.width * 0.18 : viewport.width * 0.3;

  useFrame((state, delta) => {
    if (!group.current) return;

    const scroll = typeof window !== "undefined" ? window.scrollY : 0;
    const targetY = state.pointer.x * 0.35 + scroll * 0.0009;
    const targetX = -state.pointer.y * 0.25 + scroll * 0.0004;

    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetY,
      3,
      delta,
    );
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetX,
      3,
      delta,
    );
    group.current.position.y = THREE.MathUtils.damp(
      group.current.position.y,
      -scroll * 0.0025,
      3,
      delta,
    );
  });

  return (
    <group ref={group} position={[baseX, 0, 0]} scale={scale}>
      {children}
    </group>
  );
}

/* ----------------------------------------------------------------
   ESCENA
   ---------------------------------------------------------------- */

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 4]} intensity={2.2} castShadow />
      <pointLight position={[-4, -2, 3]} intensity={12} color="#4978de" />
      <pointLight position={[3, 3, -3]} intensity={6} color="#eecd5f" />

      {/* Entorno procedural (sin descargas externas) para reflejos metálicos */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 0]}>
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 4, -9]} scale={[10, 1, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          <Lightformer intensity={1.5} color="#4978de" position={[0, -3, 5]} scale={[6, 2, 1]} />
        </group>
      </Environment>

      <Rig>
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.2}>
          <Gear teeth={16} radius={1.7} depth={0.32} speed={0.25} material={steel} position={[0.6, 0.4, 0]} />
        </Float>

        <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
          <Gear teeth={10} radius={0.85} depth={0.28} speed={-0.5} material={blue} position={[2.6, 1.7, 0.5]} />
        </Float>

        <Float speed={1.2} rotationIntensity={1} floatIntensity={1.4}>
          <Bearing position={[-0.9, -2, 0.9]} rotation={[0.5, 0.2, 0]} scale={0.8} />
        </Float>

        <Float speed={2} rotationIntensity={1.2} floatIntensity={1.2}>
          <HexNut position={[2.7, -1.3, 1.2]} rotation={[0.6, 0.3, 0.2]} />
        </Float>

        <Float speed={1.6} rotationIntensity={1.4} floatIntensity={1.3}>
          <Bolt position={[-0.7, 2.2, -0.4]} rotation={[0.3, 0, 0.9]} scale={0.85} />
        </Float>

        <Float speed={1.1} rotationIntensity={0.5} floatIntensity={1}>
          <Gear teeth={22} radius={2.6} depth={0.18} speed={0.12} material={darkSteel} position={[3.4, -0.9, -2.8]} />
        </Float>
      </Rig>

      <Sparkles count={70} scale={[16, 9, 6]} size={2.2} speed={0.35} color="#9db4f2" opacity={0.6} />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 9], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        shadows
        eventSource={document.body}
        eventPrefix="client"
      >
        <Scene />
      </Canvas>
    </div>
  );
}
