import { createContext, useContext, useState } from 'react';
import { sampleGames } from '@/data/sampleGames';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState(sampleGames);
  const [filteredGames, setFilteredGames] = useState(sampleGames);

  const searchGames = (query) => {
    const filtered = games.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  };

  const filterByCategory = (category) => {
    if (category === 'All') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => game.category === category);
      setFilteredGames(filtered);
    }
  };

  return (
    <GameContext.Provider value={{ games, filteredGames, searchGames, filterByCategory }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}