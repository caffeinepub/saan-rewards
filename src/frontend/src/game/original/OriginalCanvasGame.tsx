import { useEffect, useRef, useState } from 'react';
import { GameSettings, GameStats } from './types';
import { DIFFICULTY_PRESETS } from './settings/defaults';

interface OriginalCanvasGameProps {
  settings: GameSettings;
  onGameOver: (stats: GameStats) => void;
  onScoreUpdate: (score: number) => void;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  color: string;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  targetX: number;
}

export function OriginalCanvasGame({ settings, onGameOver, onScoreUpdate }: OriginalCanvasGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const gameStateRef = useRef({
    player: null as Player | null,
    obstacles: [] as Obstacle[],
    score: 0,
    obstaclesAvoided: 0,
    lastSpawnTime: 0,
    animationId: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize player
    const playerWidth = 50;
    const playerHeight = 50;
    gameStateRef.current.player = {
      x: canvas.width / 2 - playerWidth / 2,
      y: canvas.height - playerHeight - 20,
      width: playerWidth,
      height: playerHeight,
      targetX: canvas.width / 2 - playerWidth / 2,
    };

    // Get difficulty multipliers
    const difficultyPreset = DIFFICULTY_PRESETS[settings.difficulty];
    const baseSpeed = 3 * settings.speed * difficultyPreset.speed;
    const spawnInterval = 1500 / (settings.spawnRate * difficultyPreset.spawnRate);

    // Touch/Click controls
    const handlePointerDown = (e: PointerEvent) => {
      if (!gameStateRef.current.player) return;
      
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const canvasWidth = canvas.width;
      
      // Move to left or right half
      if (clickX < canvasWidth / 2) {
        // Move left
        gameStateRef.current.player.targetX = canvasWidth * 0.25 - gameStateRef.current.player.width / 2;
      } else {
        // Move right
        gameStateRef.current.player.targetX = canvasWidth * 0.75 - gameStateRef.current.player.width / 2;
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);

    // Spawn obstacle
    const spawnObstacle = () => {
      const obstacleWidth = 40 + Math.random() * 30;
      const obstacleHeight = 40 + Math.random() * 30;
      const x = Math.random() * (canvas.width - obstacleWidth);
      
      const colors = ['#ff4444', '#ffaa00', '#44ff44', '#4444ff', '#ff44ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      gameStateRef.current.obstacles.push({
        x,
        y: -obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
        speed: baseSpeed + Math.random() * 2,
        color,
      });
    };

    // Check collision
    const checkCollision = (player: Player, obstacle: Obstacle): boolean => {
      return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      );
    };

    // Game loop
    let lastTime = performance.now();
    const gameLoop = (currentTime: number) => {
      if (!isPlaying) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      const player = gameStateRef.current.player;
      if (!player) return;

      // Clear canvas
      ctx.fillStyle = 'oklch(0.15 0.02 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw background grid
      ctx.strokeStyle = 'oklch(0.25 0.02 0 / 0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update player position (smooth movement)
      const moveSpeed = 0.2;
      player.x += (player.targetX - player.x) * moveSpeed;

      // Clamp player position
      player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));

      // Draw player
      ctx.fillStyle = 'oklch(0.60 0.26 25)';
      ctx.shadowColor = 'oklch(0.60 0.26 25)';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(
        player.x + player.width / 2,
        player.y + player.height / 2,
        player.width / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw player eyes
      ctx.fillStyle = 'oklch(0.98 0 0)';
      ctx.beginPath();
      ctx.arc(player.x + player.width * 0.35, player.y + player.height * 0.4, 5, 0, Math.PI * 2);
      ctx.arc(player.x + player.width * 0.65, player.y + player.height * 0.4, 5, 0, Math.PI * 2);
      ctx.fill();

      // Spawn obstacles
      if (currentTime - gameStateRef.current.lastSpawnTime > spawnInterval) {
        spawnObstacle();
        gameStateRef.current.lastSpawnTime = currentTime;
      }

      // Update and draw obstacles
      const obstacles = gameStateRef.current.obstacles;
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const obstacle = obstacles[i];
        obstacle.y += obstacle.speed;

        // Draw obstacle
        ctx.fillStyle = obstacle.color;
        ctx.shadowColor = obstacle.color;
        ctx.shadowBlur = 15;
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.shadowBlur = 0;

        // Check collision
        if (checkCollision(player, obstacle)) {
          setIsPlaying(false);
          onGameOver({
            score: gameStateRef.current.score,
            highScore: 0,
            obstaclesAvoided: gameStateRef.current.obstaclesAvoided,
          });
          return;
        }

        // Remove off-screen obstacles and update score
        if (obstacle.y > canvas.height) {
          obstacles.splice(i, 1);
          gameStateRef.current.score += 10;
          gameStateRef.current.obstaclesAvoided += 1;
          onScoreUpdate(gameStateRef.current.score);
        }
      }

      gameStateRef.current.animationId = requestAnimationFrame(gameLoop);
    };

    gameStateRef.current.animationId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      if (gameStateRef.current.animationId) {
        cancelAnimationFrame(gameStateRef.current.animationId);
      }
    };
  }, [settings, isPlaying, onGameOver, onScoreUpdate]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full touch-none"
      style={{ touchAction: 'none' }}
    />
  );
}
