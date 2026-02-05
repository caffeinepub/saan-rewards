import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
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

  // Load player car texture
  const playerTexture = useLoader(THREE.TextureLoader, '/assets/generated/traffic-jam-player-car-texture.dim_1024x512.png');

  // Player car dimensions
  const playerWidth = 0.8;
  const playerHeight = 0.4;
  const playerDepth = 1.2;

  // Lane positions
  const lanes = [-2, 0, 2];
  const playerLane = useRef(1); // Start in middle lane

  // Road dimensions
  const roadWidth = 7;
  const shoulderWidth = 1.5;
  const totalRoadWidth = roadWidth + shoulderWidth * 2;

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

  // Create roadside plants using instanced meshes for performance
  const { leftPlants, rightPlants } = useMemo(() => {
    const plantCount = 30;
    const plantSpacing = 2.5;
    const leftPlantPositions: THREE.Matrix4[] = [];
    const rightPlantPositions: THREE.Matrix4[] = [];

    for (let i = 0; i < plantCount; i++) {
      const z = -i * plantSpacing + 5;
      const xOffset = totalRoadWidth / 2 + 1.2 + Math.random() * 0.5;
      
      // Left side plants
      const leftMatrix = new THREE.Matrix4();
      const leftScale = 0.6 + Math.random() * 0.4;
      leftMatrix.compose(
        new THREE.Vector3(-xOffset, 0, z),
        new THREE.Quaternion(),
        new THREE.Vector3(leftScale, leftScale * (1.2 + Math.random() * 0.6), leftScale)
      );
      leftPlantPositions.push(leftMatrix);

      // Right side plants
      const rightMatrix = new THREE.Matrix4();
      const rightScale = 0.6 + Math.random() * 0.4;
      rightMatrix.compose(
        new THREE.Vector3(xOffset, 0, z),
        new THREE.Quaternion(),
        new THREE.Vector3(rightScale, rightScale * (1.2 + Math.random() * 0.6), rightScale)
      );
      rightPlantPositions.push(rightMatrix);
    }

    return { leftPlants: leftPlantPositions, rightPlants: rightPlantPositions };
  }, []);

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

      {/* Lane markers */}
      {[-1, 1].map((x, i) => (
        <mesh key={i} position={[x, 0, -5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.1, 40]} />
          <meshStandardMaterial color="#ffcc00" />
        </mesh>
      ))}

      {/* Left side plants (instanced) */}
      <instancedMesh args={[undefined, undefined, leftPlants.length]} castShadow>
        <coneGeometry args={[0.4, 1.5, 6]} />
        <meshStandardMaterial color="#1a4d1a" roughness={0.8} />
        {leftPlants.map((matrix, i) => (
          <primitive key={i} object={matrix} attach={`instanceMatrix-${i}`} />
        ))}
      </instancedMesh>

      {/* Right side plants (instanced) */}
      <instancedMesh args={[undefined, undefined, rightPlants.length]} castShadow>
        <coneGeometry args={[0.4, 1.5, 6]} />
        <meshStandardMaterial color="#1a4d1a" roughness={0.8} />
        {rightPlants.map((matrix, i) => (
          <primitive key={i} object={matrix} attach={`instanceMatrix-${i}`} />
        ))}
      </instancedMesh>

      {/* Player car with texture */}
      <mesh ref={playerRef} position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[playerWidth, playerHeight, playerDepth]} />
        <meshStandardMaterial map={playerTexture} />
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
