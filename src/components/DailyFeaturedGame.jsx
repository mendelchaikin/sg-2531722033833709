import { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import FeaturedGame from './FeaturedGame';
import { Skeleton } from '@/components/ui/skeleton';

export default function DailyFeaturedGame() {
  const { games, isLoading, error } = useGameContext();
  const [dailyGame, setDailyGame] = useState(null);

  useEffect(() => {
    const selectDailyGame = () => {
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem('dailyGameDate');
      const storedGameId = localStorage.getItem('dailyGameId');

      if (storedDate === today && storedGameId && games.length > 0) {
        setDailyGame(games.find(game => game.id === parseInt(storedGameId)) || null);
      } else if (games.length > 0) {
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
      <FeaturedGame game={dailyGame} />
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