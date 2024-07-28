import { useState, useEffect, Suspense } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import DailyFeaturedGame from '@/components/DailyFeaturedGame';
import GameGrid from '@/components/GameGrid';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { filteredGames, isLoading, error, filterByCategory, toggleFavorite } = useGameContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { user } = useAuth();
  const gamesPerPage = 8;

  const categories = ['All', ...new Set(filteredGames.map(game => game.category))];

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const toggleBackToTop = () => {
      if (window.pageYOffset > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleBackToTop);

    return () => window.removeEventListener('scroll', toggleBackToTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleFavorite = (gameId) => {
    if (user) {
      toggleFavorite(gameId);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Gaming Site - Play Awesome Games Online</title>
        <meta name="description" content="Discover and play the best online games on our gaming site. From action to puzzle, we have games for everyone." />
        <meta name="keywords" content="online games, gaming, puzzle games, action games, arcade games" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Skeleton className="h-96 w-full mb-8" />}>
        <DailyFeaturedGame />
      </Suspense>
      <Categories categories={categories} onSelectCategory={filterByCategory} />
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      <GameGrid games={currentGames} isLoading={isLoading} onFavorite={handleFavorite} />
      {filteredGames.length > gamesPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(filteredGames.length / gamesPerPage))].map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className={currentPage === index + 1 ? "bg-purple-600" : ""}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
      {showBackToTop && (
        <Button
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 rounded-full p-3"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </Button>
      )}
    </Layout>
  );
}