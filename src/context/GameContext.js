import { createContext, useContext, useState, useCallback } from 'react';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  const searchGames = useCallback((query) => {
    const filtered = games.filter(game => 
      game.title.toLowerCase().includes(query.toLowerCase()) ||
      game.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGames(filtered);
  }, [games]);

  const filterByCategory = useCallback((category) => {
    if (category === 'All') {
      setFilteredGames(games);
    } else {
      const filtered = games.filter(game => game.category === category);
      setFilteredGames(filtered);
    }
  }, [games]);

  const value = {
    games,
    setGames,
    filteredGames,
    searchGames,
    filterByCategory,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}