import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GameState } from '../TrafficJamGame';
import TouchControls from '../controls/TouchControls';
import { useGameControls } from '../controls/useGameControls';
import CanvasErrorBoundary from '../ui/CanvasErrorBoundary';
import { Button } from '@/components/ui/button';
import PlayerCarModel from './PlayerCarModel';

interface TrafficJamSceneProps {
  gameState: GameState;
  onGameOver: () => void;
  onScoreUpdate: (score: number) => void;
  onRetry: () => void;
  isBlocked?: boolean;
}

interface Obstacle {
  id: number;
  x: number;
  z: number;
}

function GameScene({ gameState, onGameOver, onScoreUpdate, isBlocked = false }: Omit<TrafficJamSceneProps, 'onRetry'>) {
  const playerRef = useRef<THREE.Group>(null);
  const leftPlantsRef = useRef<THREE.InstancedMesh>(null);
  const rightPlantsRef = useRef<THREE.InstancedMesh>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const speedRef = useRef(0.1);
  const nextObstacleId = useRef(0);
  const lastSpawnZ = useRef(-10);
  const controls = useGameControls();

  // Player car dimensions (for collision detection)
  const playerWidth = 0.8;
  const playerDepth = 1.2;

  // Road dimensions
  const roadWidth = 7;
  const shoulderWidth = 1.5;
  const totalRoadWidth = roadWidth + shoulderWidth * 2;

  // Single-road steering parameters
  const lateralSpeed = 5; // Units per second for left/right movement
  const drivableRoadWidth = roadWidth - 0.5; // Leave margin from curbs
  const maxPlayerX = drivableRoadWidth / 2 - playerWidth / 2;
  const minPlayerX = -maxPlayerX;

  // Initialize obstacles
  useEffect(() => {
    obstaclesRef.current = [];
    scoreRef.current = 0;
    speedRef.current = 0.1;
    lastSpawnZ.current = -10;
  }, []);

  // Create roadside plants using instanced meshes for performance
  const plantCount = 30;
  
  // Initialize instanced meshes
  useEffect(() => {
    if (!leftPlantsRef.current || !rightPlantsRef.current) return;

    const plantSpacing = 2.5;
    const dummy = new THREE.Object3D();

    // Set up left side plants
    for (let i = 0; i < plantCount; i++) {
      const z = -i * plantSpacing + 5;
      const xOffset = totalRoadWidth / 2 + 1.2 + Math.random() * 0.5;
      const scale = 0.6 + Math.random() * 0.4;
      
      dummy.position.set(-xOffset, 0, z);
      dummy.scale.set(scale, scale * (1.2 + Math.random() * 0.6), scale);
      dummy.updateMatrix();
      leftPlantsRef.current.setMatrixAt(i, dummy.matrix);
    }
    leftPlantsRef.current.instanceMatrix.needsUpdate = true;

    // Set up right side plants
    for (let i = 0; i < plantCount; i++) {
      const z = -i * plantSpacing + 5;
      const xOffset = totalRoadWidth / 2 + 1.2 + Math.random() * 0.5;
      const scale = 0.6 + Math.random() * 0.4;
      
      dummy.position.set(xOffset, 0, z);
      dummy.scale.set(scale, scale * (1.2 + Math.random() * 0.6), scale);
      dummy.updateMatrix();
      rightPlantsRef.current.setMatrixAt(i, dummy.matrix);
    }
    rightPlantsRef.current.instanceMatrix.needsUpdate = true;
  }, [plantCount, totalRoadWidth]);

  // Spawn obstacles (barriers only, no cars)
  const spawnObstacle = () => {
    const z = lastSpawnZ.current - (8 + Math.random() * 4);
    // Spawn obstacles randomly across the drivable road width
    const x = (Math.random() - 0.5) * drivableRoadWidth;
    
    obstaclesRef.current.push({
      id: nextObstacleId.current++,
      x,
      z,
    });
    
    lastSpawnZ.current = z;
  };

  useFrame((state, delta) => {
    // Block gameplay if offline or game is over
    if (gameState !== 'playing' || !playerRef.current || isBlocked) return;

    // Update score
    scoreRef.current += delta * 10;
    onScoreUpdate(Math.floor(scoreRef.current));

    // Gradually increase speed
    speedRef.current = Math.min(0.25, 0.1 + scoreRef.current * 0.0001);

    // Handle continuous lateral movement
    let targetXDelta = 0;
    if (controls.left) {
      targetXDelta = -lateralSpeed * delta;
    }
    if (controls.right) {
      targetXDelta = lateralSpeed * delta;
    }

    // Apply lateral movement with clamping to road boundaries
    const newX = playerRef.current.position.x + targetXDelta;
    playerRef.current.position.x = Math.max(minPlayerX, Math.min(maxPlayerX, newX));

    // Apply brake
    const currentSpeed = controls.brake ? speedRef.current * 0.5 : speedRef.current;

    // Move obstacles toward player
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.z += currentSpeed;
      
      // Remove obstacles that passed the player
      if (obstacle.z > 5) {
        return false;
      }

      // Collision detection (using gameplay dimensions, not visual mesh)
      if (
        Math.abs(obstacle.z - 0) < (playerDepth / 2 + 1) &&
        Math.abs(obstacle.x - playerRef.current!.position.x) < (playerWidth / 2 + 0.6)
      ) {
        onGameOver();
      }

      return true;
    });

    // Spawn new obstacles
    if (lastSpawnZ.current > -20) {
      spawnObstacle();
    }
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.3} />

      {/* Camera */}
      <OrthographicCamera
        makeDefault
        position={[0, 12, 8]}
        rotation={[-Math.PI / 3, 0, 0]}
        zoom={50}
      />

      {/* Ground plane (grass) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, -5]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial color="#2d5a2d" />
      </mesh>

      {/* Main road surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, -5]} receiveShadow>
        <planeGeometry args={[roadWidth, 40]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>

      {/* Left shoulder */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-(roadWidth / 2 + shoulderWidth / 2), -0.08, -5]} receiveShadow>
        <planeGeometry args={[shoulderWidth, 40]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} />
      </mesh>

      {/* Right shoulder */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[(roadWidth / 2 + shoulderWidth / 2), -0.08, -5]} receiveShadow>
        <planeGeometry args={[shoulderWidth, 40]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.95} />
      </mesh>

      {/* Left road edge/curb */}
      <mesh position={[-roadWidth / 2, 0.05, -5]} castShadow>
        <boxGeometry args={[0.15, 0.15, 40]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Right road edge/curb */}
      <mesh position={[roadWidth / 2, 0.05, -5]} castShadow>
        <boxGeometry args={[0.15, 0.15, 40]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>

      {/* Left side plants (instanced) */}
      <instancedMesh ref={leftPlantsRef} args={[undefined, undefined, plantCount]} castShadow>
        <coneGeometry args={[0.4, 1.5, 6]} />
        <meshStandardMaterial color="#1a4d1a" roughness={0.8} />
      </instancedMesh>

      {/* Right side plants (instanced) */}
      <instancedMesh ref={rightPlantsRef} args={[undefined, undefined, plantCount]} castShadow>
        <coneGeometry args={[0.4, 1.5, 6]} />
        <meshStandardMaterial color="#1a4d1a" roughness={0.8} />
      </instancedMesh>

      {/* Player car with realistic 3D model */}
      <group ref={playerRef}>
        <PlayerCarModel position={[0, 0, 0]} />
      </group>

      {/* Obstacles (barriers only - no cars) */}
      {obstaclesRef.current.map((obstacle) => (
        <mesh
          key={obstacle.id}
          position={[obstacle.x, 0.3, obstacle.z]}
          castShadow
        >
          <boxGeometry args={[1.2, 0.6, 0.6]} />
          <meshStandardMaterial color="#ff8800" />
        </mesh>
      ))}
    </>
  );
}

// Check WebGL support
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

export default function TrafficJamScene(props: TrafficJamSceneProps) {
  const hasWebGL = checkWebGLSupport();

  if (!hasWebGL) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center p-6">
          <p className="text-destructive font-semibold mb-4">WebGL is not supported on your device</p>
          <Button onClick={props.onRetry}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <CanvasErrorBoundary onRetry={props.onRetry}>
      <Canvas
        shadows
        className="w-full h-full"
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#87ceeb']} />
        <GameScene {...props} />
      </Canvas>
      
      {/* Touch controls overlay */}
      <TouchControls />
    </CanvasErrorBoundary>
  );
}
