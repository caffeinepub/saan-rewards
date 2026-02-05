import { useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

interface PlayerCarModelProps {
  position: [number, number, number];
}

export default function PlayerCarModel({ position }: PlayerCarModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load player car texture
  const playerTexture = useLoader(THREE.TextureLoader, '/assets/generated/traffic-jam-player-car-texture.dim_1024x512.png');

  return (
    <group ref={groupRef} position={position} rotation={[0, Math.PI, 0]}>
      {/* Main car body (chassis) */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <boxGeometry args={[0.8, 0.25, 1.2]} />
        <meshStandardMaterial map={playerTexture} />
      </mesh>

      {/* Car cabin/roof */}
      <mesh position={[0, 0.4, -0.1]} castShadow>
        <boxGeometry args={[0.65, 0.35, 0.7]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Front windshield */}
      <mesh position={[0, 0.42, 0.25]} rotation={[Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.64, 0.25, 0.05]} />
        <meshStandardMaterial color="#4a90e2" transparent opacity={0.6} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Rear windshield */}
      <mesh position={[0, 0.42, -0.45]} rotation={[-Math.PI / 6, 0, 0]} castShadow>
        <boxGeometry args={[0.64, 0.25, 0.05]} />
        <meshStandardMaterial color="#4a90e2" transparent opacity={0.6} metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Front left wheel */}
      <mesh position={[-0.35, 0.08, 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Front right wheel */}
      <mesh position={[0.35, 0.08, 0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Rear left wheel */}
      <mesh position={[-0.35, 0.08, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Rear right wheel */}
      <mesh position={[0.35, 0.08, -0.4]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, 0.1, 0.62]} castShadow>
        <boxGeometry args={[0.75, 0.12, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Rear bumper */}
      <mesh position={[0, 0.1, -0.62]} castShadow>
        <boxGeometry args={[0.75, 0.12, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.25, 0.15, 0.62]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.05]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff66" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.25, 0.15, 0.62]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.05]} />
        <meshStandardMaterial color="#ffff99" emissive="#ffff66" emissiveIntensity={0.5} />
      </mesh>

      {/* Taillights */}
      <mesh position={[-0.25, 0.15, -0.62]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.05]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.25, 0.15, -0.62]} castShadow>
        <boxGeometry args={[0.15, 0.08, 0.05]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
