import { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';
import FeaturedGame from './FeaturedGame';

export default function DailyFeaturedGame() {
  const { games } = useGameContext();
  const [dailyGame, setDailyGame] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('dailyGameDate');
    const storedGameId = localStorage.getItem('dailyGameId');

    if (storedDate === today && storedGameId) {
      setDailyGame(games.find(game => game.id === parseInt(storedGameId)));
    } else {
      const randomGame = games[Math.floor(Math.random() * games.length)];
      setDailyGame(randomGame);
      localStorage.setItem('dailyGameDate', today);
      localStorage.setItem('dailyGameId', randomGame.id.toString());
    }
  }, [games]);

  if (!dailyGame) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Daily Featured Game</h2>
      <FeaturedGame game={dailyGame} />
    </div>
  );
}