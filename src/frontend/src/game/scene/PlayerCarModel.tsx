import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerCarModelProps {
  position: [number, number, number];
}

export default function PlayerCarModel({ position }: PlayerCarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load new race car texture
  const raceTexture = useLoader(THREE.TextureLoader, '/assets/generated/race-car-texture.dim_1024x512.png');
  
  // Configure texture for better appearance
  raceTexture.wrapS = THREE.RepeatWrapping;
  raceTexture.wrapT = THREE.RepeatWrapping;
  raceTexture.anisotropy = 16;

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.PI, 0]} scale={0.85}>
      {/* Lower chassis - race car style (wider, lower profile) */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.85, 0.18, 1.3]} />
        <meshStandardMaterial map={raceTexture} metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Aerodynamic front nose cone */}
      <mesh position={[0, 0.12, 0.7]} castShadow>
        <boxGeometry args={[0.7, 0.15, 0.2]} />
        <meshStandardMaterial map={raceTexture} metalness={0.4} roughness={0.6} />
      </mesh>

      {/* Low-profile cockpit/cabin */}
      <mesh position={[0, 0.32, -0.05]} castShadow>
        <boxGeometry args={[0.6, 0.28, 0.75]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Front windshield - more angled for race car look */}
      <mesh position={[0, 0.35, 0.3]} rotation={[Math.PI / 4.5, 0, 0]} castShadow>
        <boxGeometry args={[0.58, 0.22, 0.04]} />
        <meshStandardMaterial color="#2a5a8a" transparent opacity={0.5} metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Rear spoiler/wing - signature race car element */}
      <mesh position={[0, 0.5, -0.65]} castShadow>
        <boxGeometry args={[0.75, 0.08, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Spoiler supports */}
      <mesh position={[-0.3, 0.38, -0.65]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0.3, 0.38, -0.65]} castShadow>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Side skirts - aerodynamic elements */}
      <mesh position={[-0.45, 0.06, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0.45, 0.06, 0]} castShadow>
        <boxGeometry args={[0.08, 0.08, 1.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Front left wheel - lower profile racing tires */}
      <mesh position={[-0.38, 0.08, 0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.18, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Front right wheel */}
      <mesh position={[0.38, 0.08, 0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.18, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Rear left wheel */}
      <mesh position={[-0.38, 0.08, -0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.18, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Rear right wheel */}
      <mesh position={[0.38, 0.08, -0.45]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.18, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.95} />
      </mesh>

      {/* Racing headlights - sleek and low */}
      <mesh position={[-0.22, 0.14, 0.78]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.06]} />
        <meshStandardMaterial color="#e8f4ff" emissive="#c8e0ff" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.22, 0.14, 0.78]} castShadow>
        <boxGeometry args={[0.18, 0.08, 0.06]} />
        <meshStandardMaterial color="#e8f4ff" emissive="#c8e0ff" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Racing taillights - LED style */}
      <mesh position={[-0.28, 0.18, -0.68]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.04]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#ff0000" emissiveIntensity={0.4} />
      </mesh>
      <mesh position={[0.28, 0.18, -0.68]} castShadow>
        <boxGeometry args={[0.12, 0.06, 0.04]} />
        <meshStandardMaterial color="#ff2a2a" emissive="#ff0000" emissiveIntensity={0.4} />
      </mesh>

      {/* Front air intake/splitter */}
      <mesh position={[0, 0.05, 0.82]} castShadow>
        <boxGeometry args={[0.65, 0.06, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Rear diffuser */}
      <mesh position={[0, 0.06, -0.72]} castShadow>
        <boxGeometry args={[0.7, 0.08, 0.12]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Side mirrors */}
      <mesh position={[-0.52, 0.35, 0.25]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.52, 0.35, 0.25]} castShadow>
        <boxGeometry args={[0.08, 0.06, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}
