import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { GameState } from '../TrafficJamGame';
import TouchControls from '../controls/TouchControls';
import { useGameControls } from '../controls/useGameControls';

interface TrafficJamSceneProps {
  gameState: GameState;
  onGameOver: () => void;
  onScoreUpdate: (score: number) => void;
  isBlocked?: boolean;
}

interface Obstacle {
  id: number;
  x: number;
  z: number;
  type: 'car' | 'barrier';
}

function GameScene({ gameState, onGameOver, onScoreUpdate, isBlocked = false }: TrafficJamSceneProps) {
  const playerRef = useRef<THREE.Mesh>(null);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const scoreRef = useRef(0);
  const speedRef = useRef(0.1);
  const nextObstacleId = useRef(0);
  const lastSpawnZ = useRef(-10);
  const controls = useGameControls();

  // Player car dimensions
  const playerWidth = 0.8;
  const playerHeight = 0.4;
  const playerDepth = 1.2;

  // Lane positions
  const lanes = [-2, 0, 2];
  const playerLane = useRef(1); // Start in middle lane

  // Initialize obstacles
  useEffect(() => {
    obstaclesRef.current = [];
    scoreRef.current = 0;
    speedRef.current = 0.1;
    lastSpawnZ.current = -10;
    playerLane.current = 1;
  }, []);

  // Spawn obstacles
  const spawnObstacle = () => {
    const z = lastSpawnZ.current - (8 + Math.random() * 4);
    const laneIndex = Math.floor(Math.random() * lanes.length);
    const type = Math.random() > 0.3 ? 'car' : 'barrier';
    
    obstaclesRef.current.push({
      id: nextObstacleId.current++,
      x: lanes[laneIndex],
      z,
      type,
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

    // Handle player movement
    const targetX = lanes[playerLane.current];
    const currentX = playerRef.current.position.x;
    const moveSpeed = 8 * delta;
    
    if (controls.left && playerLane.current > 0) {
      if (Math.abs(currentX - targetX) < 0.1) {
        playerLane.current--;
      }
    }
    if (controls.right && playerLane.current < lanes.length - 1) {
      if (Math.abs(currentX - targetX) < 0.1) {
        playerLane.current++;
      }
    }

    // Smooth lane transition
    const newTargetX = lanes[playerLane.current];
    if (Math.abs(currentX - newTargetX) > 0.05) {
      playerRef.current.position.x += (newTargetX - currentX) * moveSpeed;
    } else {
      playerRef.current.position.x = newTargetX;
    }

    // Apply brake
    const currentSpeed = controls.brake ? speedRef.current * 0.5 : speedRef.current;

    // Move obstacles toward player
    obstaclesRef.current = obstaclesRef.current.filter(obstacle => {
      obstacle.z += currentSpeed;
      
      // Remove obstacles that passed the player
      if (obstacle.z > 5) {
        return false;
      }

      // Collision detection
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

      {/* Road */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -5]} receiveShadow>
        <planeGeometry args={[10, 40]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Lane markers */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 0, -5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 40]} />
          <meshStandardMaterial color="#ffcc00" />
        </mesh>
      ))}

      {/* Player car */}
      <mesh ref={playerRef} position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[playerWidth, playerHeight, playerDepth]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>

      {/* Obstacles */}
      {obstaclesRef.current.map((obstacle) => (
        <mesh
          key={obstacle.id}
          position={[obstacle.x, obstacle.type === 'car' ? 0.2 : 0.3, obstacle.z]}
          castShadow
        >
          {obstacle.type === 'car' ? (
            <>
              <boxGeometry args={[0.8, 0.4, 1.2]} />
              <meshStandardMaterial color="#4444ff" />
            </>
          ) : (
            <>
              <boxGeometry args={[1.2, 0.6, 0.6]} />
              <meshStandardMaterial color="#ff8800" />
            </>
          )}
        </mesh>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -5]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial color="#1a5f1a" />
      </mesh>
    </>
  );
}

export default function TrafficJamScene(props: TrafficJamSceneProps) {
  return (
    <>
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
    </>
  );
}
