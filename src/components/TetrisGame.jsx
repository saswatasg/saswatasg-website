import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCw, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const BLOCK_SIZE = 25;

const TETROMINOS = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: 'hsl(var(--primary))'
  },
  L: {
    shape: [[1, 0], [1, 0], [1, 1]],
    color: 'hsl(var(--secondary))'
  },
  T: {
    shape: [[1, 1, 1], [0, 1, 0]],
    color: 'hsl(var(--accent))'
  },
  O: {
    shape: [[1, 1], [1, 1]],
    color: 'hsl(var(--muted))'
  }
};

function createEmptyBoard() {
  return Array(BOARD_HEIGHT).fill().map(() => Array(BOARD_WIDTH).fill(0));
}

function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const spawnPiece = useCallback(() => {
    const pieces = Object.keys(TETROMINOS);
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)];
    setCurrentPiece({
      ...TETROMINOS[randomPiece],
      shape: [...TETROMINOS[randomPiece].shape]
    });
    setPosition({ x: Math.floor(BOARD_WIDTH / 2) - 1, y: 0 });
  }, []);

  const moveLeft = useCallback(() => {
    if (currentPiece && position.x > 0) {
      setPosition(prev => ({ ...prev, x: prev.x - 1 }));
    }
  }, [currentPiece, position]);

  const moveRight = useCallback(() => {
    if (currentPiece && position.x < BOARD_WIDTH - currentPiece.shape[0].length) {
      setPosition(prev => ({ ...prev, x: prev.x + 1 }));
    }
  }, [currentPiece, position]);

  const moveDown = useCallback(() => {
    if (currentPiece && position.y < BOARD_HEIGHT - currentPiece.shape.length) {
      setPosition(prev => ({ ...prev, y: prev.y + 1 }));
    } else {
      // Lock piece and spawn new one
      const newBoard = [...board];
      currentPiece.shape.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (cell) {
            newBoard[position.y + y][position.x + x] = currentPiece.color;
          }
        });
      });
      setBoard(newBoard);
      spawnPiece();
      setScore(prev => prev + 10);
    }
  }, [currentPiece, position, board, spawnPiece]);

  const rotatePiece = useCallback(() => {
    if (currentPiece) {
      const rotated = currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
      );
      setCurrentPiece(prev => ({ ...prev, shape: rotated }));
    }
  }, [currentPiece]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      moveDown();
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, moveDown]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying) return;

      switch (e.key) {
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp':
          rotatePiece();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, moveLeft, moveRight, moveDown, rotatePiece]);

  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    spawnPiece();
  };

  const togglePause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-6 p-6 interactive-card"
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="text-xl font-semibold gradient-text">Tetris Break</h3>
        <div className="text-lg font-semibold">Score: {score}</div>
      </div>

      <div
        className="relative border-2 border-primary/20 rounded-lg overflow-hidden"
        style={{
          width: BLOCK_SIZE * BOARD_WIDTH,
          height: BLOCK_SIZE * BOARD_HEIGHT
        }}
      >
        {/* Game Board */}
        {board.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <div
                key={`${x}-${y}`}
                className="border border-primary/10"
                style={{
                  width: BLOCK_SIZE,
                  height: BLOCK_SIZE,
                  backgroundColor: cell || 'transparent'
                }}
              />
            ))}
          </div>
        ))}

        {/* Current Piece */}
        {currentPiece && (
          <div
            className="absolute"
            style={{
              left: position.x * BLOCK_SIZE,
              top: position.y * BLOCK_SIZE
            }}
          >
            {currentPiece.shape.map((row, y) => (
              <div key={y} className="flex">
                {row.map((cell, x) => (
                  <div
                    key={`${x}-${y}`}
                    style={{
                      width: BLOCK_SIZE,
                      height: BLOCK_SIZE,
                      backgroundColor: cell ? currentPiece.color : 'transparent'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={togglePause} disabled={gameOver || !isPlaying}>
          <Pause className="w-4 h-4 mr-2" />
          Pause
        </Button>
        <Button onClick={startGame} variant="outline">
          <Play className="w-4 h-4 mr-2" />
          {gameOver ? 'Restart' : 'Start'}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button variant="outline" onClick={moveLeft}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={moveDown}>
          <ArrowDown className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={moveRight}>
          <ArrowRight className="w-4 h-4" />
        </Button>
        <Button variant="outline" onClick={rotatePiece} className="col-span-3">
          <RotateCw className="w-4 h-4 mr-2" />
          Rotate
        </Button>
      </div>

      <p className="text-sm text-muted-foreground text-center">
        Use arrow keys to move and rotate pieces!
      </p>
    </motion.div>
  );
}

export default TetrisGame;