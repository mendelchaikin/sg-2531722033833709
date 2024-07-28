import { createContext, useContext, useState, useCallback } from 'react';
import { sampleGames } from '@/data/sampleGames';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState(sampleGames);
  const [filteredGames, setFilteredGames] = useState(sampleGames);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchGames = useCallback((query) => {
    setIsLoading(true);
    setError(null);
    try {
      const filtered = games.filter(game => 
        game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGames(filtered);
    } catch (err) {
      setError('An error occurred while searching games');
    } finally {
      setIsLoading(false);
    }
  }, [games]);

  const filterByCategory = useCallback((category) => {
    setIsLoading(true);
    setError(null);
    try {
      if (category === 'All') {
        setFilteredGames(games);
      } else {
        const filtered = games.filter(game => game.category === category);
        setFilteredGames(filtered);
      }
    } catch (err) {
      setError('An error occurred while filtering games');
    } finally {
      setIsLoading(false);
    }
  }, [games]);

  return (
    <GameContext.Provider value={{ games, filteredGames, isLoading, error, searchGames, filterByCategory }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}