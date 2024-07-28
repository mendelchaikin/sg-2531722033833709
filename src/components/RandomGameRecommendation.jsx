import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import GameCard from './GameCard';

export default function RandomGameRecommendation() {
  const { games } = useGameContext();
  const [randomGame, setRandomGame] = useState(null);

  const getRandomGame = () => {
    const randomIndex = Math.floor(Math.random() * games.length);
    setRandomGame(games[randomIndex]);
  };

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">Random Game Recommendation</h2>
      <Button onClick={getRandomGame} className="mb-4">Get Random Game</Button>
      {randomGame && <GameCard game={randomGame} />}
    </div>
  );
}