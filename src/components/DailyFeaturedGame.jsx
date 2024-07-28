import { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import FeaturedGame from './FeaturedGame';
import { Skeleton } from '@/components/ui/skeleton';
import { Star } from 'lucide-react';

export default function DailyFeaturedGame() {
  const { games, isLoading, error } = useGameContext();
  const [dailyGame, setDailyGame] = useState(null);

  useEffect(() => {
    const selectDailyGame = () => {
      if (games.length === 0) return;

      const today = new Date().toDateString();
      const storedDate = localStorage.getItem('dailyGameDate');
      const storedGameId = localStorage.getItem('dailyGameId');

      if (storedDate === today && storedGameId) {
        const foundGame = games.find(game => game.id === parseInt(storedGameId));
        setDailyGame(foundGame || games[0]);
      } else {
        const randomGame = games[Math.floor(Math.random() * games.length)];
        setDailyGame(randomGame);
        localStorage.setItem('dailyGameDate', today);
        localStorage.setItem('dailyGameId', randomGame.id.toString());
      }
    };

    if (!isLoading && games.length > 0) {
      selectDailyGame();
    }
  }, [games, isLoading]);

  if (isLoading) {
    return <DailyFeaturedGameSkeleton />;
  }

  if (error) {
    return <div className="text-red-500">Error loading daily featured game: {error}</div>;
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Daily Featured Game</h2>
      {dailyGame ? (
        <div>
          <FeaturedGame game={dailyGame} />
          <div className="mt-2 flex items-center">
            <span className="mr-2">Rating:</span>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current mr-1" />
              <span>{dailyGame.averageRating || 'N/A'}</span>
            </div>
          </div>
        </div>
      ) : (
        <DailyFeaturedGameSkeleton />
      )}
    </div>
  );
}

function DailyFeaturedGameSkeleton() {
  return (
    <div className="mb-8">
      <Skeleton className="h-8 w-64 mb-4" />
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  );
}