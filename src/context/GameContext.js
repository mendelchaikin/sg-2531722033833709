import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { sampleGames } from '@/data/sampleGames';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGames = async () => {
      try {
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGames(sampleGames);
        setFilteredGames(sampleGames);
      } catch (err) {
        setError('Failed to load games');
      } finally {
        setIsLoading(false);
      }
    };

    initializeGames();
  }, []);

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

  const toggleFavorite = useCallback((gameId) => {
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, isFavorite: !game.isFavorite } : game
      )
    );
    setFilteredGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, isFavorite: !game.isFavorite } : game
      )
    );
  }, []);

  return (
    <GameContext.Provider value={{ games, filteredGames, isLoading, error, searchGames, filterByCategory, toggleFavorite }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}