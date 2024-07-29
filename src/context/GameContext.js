import { createContext, useContext, useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
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
      toast({
        title: "Error",
        description: "An error occurred while searching games. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "An error occurred while filtering games. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [games]);

  const value = {
    games,
    setGames,
    filteredGames,
    isLoading,
    error,
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