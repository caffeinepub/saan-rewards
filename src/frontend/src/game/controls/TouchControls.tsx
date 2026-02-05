import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setGameControl } from './useGameControls';
import { useEffect, useRef } from 'react';

export default function TouchControls() {
  const leftButtonRef = useRef<HTMLButtonElement>(null);
  const rightButtonRef = useRef<HTMLButtonElement>(null);
  const brakeButtonRef = useRef<HTMLButtonElement>(null);

  // Cleanup function to ensure controls are released
  useEffect(() => {
    return () => {
      setGameControl('left', false);
      setGameControl('right', false);
      setGameControl('brake', false);
    };
  }, []);

  // Left button handlers
  const handleLeftPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setGameControl('left', true);
    if (leftButtonRef.current) {
      leftButtonRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleLeftPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGameControl('left', false);
    if (leftButtonRef.current) {
      leftButtonRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleLeftPointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    setGameControl('left', false);
    if (leftButtonRef.current) {
      try {
        leftButtonRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore if already released
      }
    }
  };

  // Right button handlers
  const handleRightPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setGameControl('right', true);
    if (rightButtonRef.current) {
      rightButtonRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleRightPointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGameControl('right', false);
    if (rightButtonRef.current) {
      rightButtonRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleRightPointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    setGameControl('right', false);
    if (rightButtonRef.current) {
      try {
        rightButtonRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore if already released
      }
    }
  };

  // Brake button handlers
  const handleBrakePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setGameControl('brake', true);
    if (brakeButtonRef.current) {
      brakeButtonRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleBrakePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setGameControl('brake', false);
    if (brakeButtonRef.current) {
      brakeButtonRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleBrakePointerCancel = (e: React.PointerEvent<HTMLButtonElement>) => {
    setGameControl('brake', false);
    if (brakeButtonRef.current) {
      try {
        brakeButtonRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore if already released
      }
    }
  };

  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center items-end gap-4 px-4 pointer-events-none md:hidden touch-none select-none">
      <div className="flex gap-3 pointer-events-auto">
        {/* Left button */}
        <Button
          ref={leftButtonRef}
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform touch-none select-none"
          onPointerDown={handleLeftPointerDown}
          onPointerUp={handleLeftPointerUp}
          onPointerCancel={handleLeftPointerCancel}
          onLostPointerCapture={handleLeftPointerCancel}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Brake button */}
        <Button
          ref={brakeButtonRef}
          size="lg"
          variant="destructive"
          className="h-16 w-20 rounded-full shadow-lg active:scale-95 transition-transform font-bold touch-none select-none"
          onPointerDown={handleBrakePointerDown}
          onPointerUp={handleBrakePointerUp}
          onPointerCancel={handleBrakePointerCancel}
          onLostPointerCapture={handleBrakePointerCancel}
        >
          BRAKE
        </Button>

        {/* Right button */}
        <Button
          ref={rightButtonRef}
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform touch-none select-none"
          onPointerDown={handleRightPointerDown}
          onPointerUp={handleRightPointerUp}
          onPointerCancel={handleRightPointerCancel}
          onLostPointerCapture={handleRightPointerCancel}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
