import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { sampleGames } from '@/data/sampleGames';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [featuredGame, setFeaturedGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeGames = async () => {
      try {
        setIsLoading(true);
        // Simulating an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setGames(sampleGames);
        setFilteredGames(sampleGames.filter(game => !game.isEmbedded));
        setFeaturedGame(getRandomGame(sampleGames.filter(game => !game.isEmbedded)));
      } catch (err) {
        setError('Failed to load games');
        console.error('Error initializing games:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeGames();
  }, []);

  const getRandomGame = (games) => {
    return games.length > 0 ? games[Math.floor(Math.random() * games.length)] : null;
  };

  const searchGames = useCallback((query) => {
    setIsLoading(true);
    setError(null);
    try {
      const filtered = games.filter(game => 
        !game.isEmbedded &&
        (game.title.toLowerCase().includes(query.toLowerCase()) ||
        game.category.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredGames(filtered);
    } catch (err) {
      setError('An error occurred while searching games');
      console.error('Error searching games:', err);
    } finally {
      setIsLoading(false);
    }
  }, [games]);

  const filterByCategory = useCallback((category) => {
    setIsLoading(true);
    setError(null);
    try {
      if (category === 'All') {
        setFilteredGames(games.filter(game => !game.isEmbedded));
      } else {
        const filtered = games.filter(game => !game.isEmbedded && game.category === category);
        setFilteredGames(filtered);
      }
    } catch (err) {
      setError('An error occurred while filtering games');
      console.error('Error filtering games:', err);
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

  const addGame = useCallback((newGame) => {
    setGames(prevGames => [...prevGames, { ...newGame, id: Date.now() }]);
    if (!newGame.isEmbedded) {
      setFilteredGames(prevGames => [...prevGames, { ...newGame, id: Date.now() }]);
    }
  }, []);

  const removeGame = useCallback((gameId) => {
    setGames(prevGames => prevGames.filter(game => game.id !== gameId));
    setFilteredGames(prevGames => prevGames.filter(game => game.id !== gameId));
  }, []);

  const value = {
    games,
    filteredGames,
    featuredGame,
    isLoading,
    error,
    searchGames,
    filterByCategory,
    toggleFavorite,
    addGame,
    removeGame
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