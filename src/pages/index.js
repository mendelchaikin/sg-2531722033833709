import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import DailyFeaturedGame from '@/components/DailyFeaturedGame';
import GameGrid from '@/components/GameGrid';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDownAZ, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Home() {
  const { filteredGames, isLoading, error, filterByCategory, toggleFavorite } = useGameContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const { user } = useAuth();
  const gamesPerPage = 8;

  useEffect(() => {
    console.log('Home page mounted');
  }, []);

  const categories = ['All', ...new Set(filteredGames.map(game => game.category))];

  const sortGames = (games, option) => {
    switch (option) {
      case 'rating':
        return [...games].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
      case 'title':
        return [...games].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return games;
    }
  };

  const sortedGames = sortGames(filteredGames, sortOption);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = sortedGames.filter(game => !game.isEmbedded).slice(indexOfFirstGame, indexOfLastGame);

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
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to favorite games.",
        variant: "destructive",
      });
    }
  };

  if (error) {
    console.error('Error in Home component:', error);
  }

  return (
    <Layout>
      <Head>
        <title>Gaming Site - Play Awesome Games Online</title>
        <meta name="description" content="Discover and play the best online games on our gaming site. From action to puzzle, we have games for everyone." />
        <meta name="keywords" content="online games, gaming, puzzle games, action games, arcade games" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="Gaming Site - Play Awesome Games Online" />
        <meta property="og:description" content="Discover and play the best online games on our gaming site. From action to puzzle, we have games for everyone." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourgamingsite.com" />
        <meta property="og:image" content="https://yourgamingsite.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Gaming Site - Play Awesome Games Online" />
        <meta name="twitter:description" content="Discover and play the best online games on our gaming site. From action to puzzle, we have games for everyone." />
        <meta name="twitter:image" content="https://yourgamingsite.com/twitter-image.jpg" />
      </Head>
      <Alert className="mb-4">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>New Feature!</AlertTitle>
        <AlertDescription>
          You can now rate games from 1 to 5 stars. Look for the star rating under each game.
        </AlertDescription>
      </Alert>
      <DailyFeaturedGame />
      <div className="flex justify-between items-center mb-4">
        <Categories categories={categories} onSelectCategory={filterByCategory} />
        <Select onValueChange={setSortOption} defaultValue={sortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="rating">
              <div className="flex items-center">
                Rating <Star className="ml-2 h-4 w-4" />
              </div>
            </SelectItem>
            <SelectItem value="title">
              <div className="flex items-center">
                Title <ArrowDownAZ className="ml-2 h-4 w-4" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      ) : (
        <GameGrid games={currentGames} onFavorite={handleFavorite} />
      )}
      {sortedGames.filter(game => !game.isEmbedded).length > gamesPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(sortedGames.filter(game => !game.isEmbedded).length / gamesPerPage))].map((_, index) => (
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
          className="fixed bottom-20 right-4 bg-purple-600 hover:bg-purple-700 rounded-full p-3"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </Button>
      )}
    </Layout>
  );
}