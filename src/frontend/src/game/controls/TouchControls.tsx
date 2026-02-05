import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setGameControl } from './useGameControls';

export default function TouchControls() {
  const handleLeftPress = () => setGameControl('left', true);
  const handleLeftRelease = () => setGameControl('left', false);
  const handleRightPress = () => setGameControl('right', true);
  const handleRightRelease = () => setGameControl('right', false);
  const handleBrakePress = () => setGameControl('brake', true);
  const handleBrakeRelease = () => setGameControl('brake', false);

  return (
    <div className="absolute bottom-20 left-0 right-0 flex justify-center items-end gap-4 px-4 pointer-events-none md:hidden">
      <div className="flex gap-3 pointer-events-auto">
        {/* Left button */}
        <Button
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform"
          onTouchStart={handleLeftPress}
          onTouchEnd={handleLeftRelease}
          onMouseDown={handleLeftPress}
          onMouseUp={handleLeftRelease}
          onMouseLeave={handleLeftRelease}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Brake button */}
        <Button
          size="lg"
          variant="destructive"
          className="h-16 w-20 rounded-full shadow-lg active:scale-95 transition-transform font-bold"
          onTouchStart={handleBrakePress}
          onTouchEnd={handleBrakeRelease}
          onMouseDown={handleBrakePress}
          onMouseUp={handleBrakeRelease}
          onMouseLeave={handleBrakeRelease}
        >
          BRAKE
        </Button>

        {/* Right button */}
        <Button
          size="lg"
          variant="secondary"
          className="h-16 w-16 rounded-full shadow-lg active:scale-95 transition-transform"
          onTouchStart={handleRightPress}
          onTouchEnd={handleRightRelease}
          onMouseDown={handleRightPress}
          onMouseUp={handleRightRelease}
          onMouseLeave={handleRightRelease}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
}
