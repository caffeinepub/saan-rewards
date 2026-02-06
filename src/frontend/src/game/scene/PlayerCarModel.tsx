import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerCarModelProps {
  position: [number, number, number];
}

export default function PlayerCarModel({ position }: PlayerCarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load race car texture
  const raceTexture = useLoader(THREE.TextureLoader, '/assets/generated/race-car-texture.dim_1024x512.png');
  
  // Configure texture for better appearance
  raceTexture.wrapS = THREE.RepeatWrapping;
  raceTexture.wrapT = THREE.RepeatWrapping;
  raceTexture.anisotropy = 16;
  raceTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.PI, 0]} scale={0.85}>
      {/* Main body - ultra-low profile exotic supercar */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.9, 0.15, 1.4]} />
        <meshStandardMaterial map={raceTexture} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Front nose - aggressive wedge shape */}
      <mesh position={[0, 0.08, 0.75]} castShadow>
        <boxGeometry args={[0.75, 0.12, 0.3]} />
        <meshStandardMaterial map={raceTexture} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Front splitter extension - extreme aero */}
      <mesh position={[0, 0.03, 0.88]} castShadow>
        <boxGeometry args={[0.85, 0.02, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit/cabin - very low and compact like a supercar */}
      <mesh position={[0, 0.28, -0.1]} castShadow>
        <boxGeometry args={[0.65, 0.25, 0.8]} />
        <meshStandardMaterial color="#050505" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Windshield - aggressive rake angle */}
      <mesh position={[0, 0.32, 0.25]} rotation={[Math.PI / 5, 0, 0]} castShadow>
        <boxGeometry args={[0.62, 0.28, 0.04]} />
        <meshStandardMaterial color="#1a3a5a" transparent opacity={0.4} metalness={0.95} roughness={0.02} />
      </mesh>

      {/* Rear window/engine cover */}
      <mesh position={[0, 0.3, -0.45]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.22, 0.04]} />
        <meshStandardMaterial color="#0a0a0a" transparent opacity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Rear wing - high-mounted GT style */}
      <mesh position={[0, 0.55, -0.7]} castShadow>
        <boxGeometry args={[0.85, 0.06, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Wing endplates */}
      <mesh position={[-0.42, 0.48, -0.7]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.28]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.42, 0.48, -0.7]} castShadow>
        <boxGeometry args={[0.03, 0.15, 0.28]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Wing supports - sleek pillars */}
      <mesh position={[-0.28, 0.38, -0.7]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.03]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.28, 0.38, -0.7]} castShadow>
        <boxGeometry args={[0.03, 0.25, 0.03]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Side skirts - aggressive ground effect */}
      <mesh position={[-0.48, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.06, 0.08, 1.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.48, 0.05, 0.05]} castShadow>
        <boxGeometry args={[0.06, 0.08, 1.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Side air intakes - supercar signature */}
      <mesh position={[-0.42, 0.15, -0.25]} rotation={[0, 0, Math.PI / 12]} castShadow>
        <boxGeometry args={[0.12, 0.15, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0.42, 0.15, -0.25]} rotation={[0, 0, -Math.PI / 12]} castShadow>
        <boxGeometry args={[0.12, 0.15, 0.35]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Front wheels - wide racing slicks */}
      <mesh position={[-0.42, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.22, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>
      <mesh position={[0.42, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.22, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Rear wheels - wider for power */}
      <mesh position={[-0.42, 0.08, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.24, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>
      <mesh position={[0.42, 0.08, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.24, 20]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Brake discs - visible through wheels */}
      <mesh position={[-0.42, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.42, 0.08, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.42, 0.08, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.42, 0.08, -0.5]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 20]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* LED headlights - sleek and modern */}
      <mesh position={[-0.25, 0.12, 0.85]} castShadow>
        <boxGeometry args={[0.2, 0.06, 0.04]} />
        <meshStandardMaterial color="#f0f8ff" emissive="#d0e8ff" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.25, 0.12, 0.85]} castShadow>
        <boxGeometry args={[0.2, 0.06, 0.04]} />
        <meshStandardMaterial color="#f0f8ff" emissive="#d0e8ff" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>

      {/* LED taillights - distinctive supercar style */}
      <mesh position={[-0.32, 0.16, -0.72]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.03]} />
        <meshStandardMaterial color="#ff1a1a" emissive="#ff0000" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.32, 0.16, -0.72]} castShadow>
        <boxGeometry args={[0.15, 0.05, 0.03]} />
        <meshStandardMaterial color="#ff1a1a" emissive="#ff0000" emissiveIntensity={0.6} />
      </mesh>

      {/* Center taillights */}
      <mesh position={[0, 0.14, -0.73]} castShadow>
        <boxGeometry args={[0.35, 0.04, 0.02]} />
        <meshStandardMaterial color="#ff1a1a" emissive="#ff0000" emissiveIntensity={0.5} />
      </mesh>

      {/* Front splitter - race-spec aero */}
      <mesh position={[0, 0.02, 0.92]} castShadow>
        <boxGeometry args={[0.9, 0.02, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rear diffuser - aggressive multi-element */}
      <mesh position={[0, 0.04, -0.75]} castShadow>
        <boxGeometry args={[0.75, 0.1, 0.15]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Diffuser fins */}
      <mesh position={[-0.25, 0.05, -0.75]} castShadow>
        <boxGeometry args={[0.02, 0.08, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, -0.75]} castShadow>
        <boxGeometry args={[0.02, 0.08, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, 0.05, -0.75]} castShadow>
        <boxGeometry args={[0.02, 0.08, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Side mirrors - aerodynamic racing style */}
      <mesh position={[-0.55, 0.32, 0.2]} castShadow>
        <boxGeometry args={[0.06, 0.05, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.55, 0.32, 0.2]} castShadow>
        <boxGeometry args={[0.06, 0.05, 0.14]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Roof scoop/air intake */}
      <mesh position={[0, 0.42, -0.15]} castShadow>
        <boxGeometry args={[0.25, 0.06, 0.2]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Exhaust pipes - quad setup */}
      <mesh position={[-0.22, 0.08, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.12, 0.08, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.12, 0.08, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0.22, 0.08, -0.78]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}
