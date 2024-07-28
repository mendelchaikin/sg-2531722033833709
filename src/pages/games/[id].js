import { useRouter } from 'next/router';
import { useGameContext } from '@/context/GameContext';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Star, Heart, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function GameDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { games, rateGame, toggleFavorite } = useGameContext();
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id && games.length > 0) {
      const foundGame = games.find(g => g.id === parseInt(id));
      if (foundGame) {
        setGame(foundGame);
      } else {
        setError('Game not found');
      }
      setIsLoading(false);
    }
  }, [id, games]);

  const handleRating = async (rating) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to rate games.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/games/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameId: game.id, rating, userId: user.id }),
      });

      if (response.ok) {
        rateGame(game.id, rating, user.id);
        setGame(prevGame => ({
          ...prevGame,
          averageRating: ((prevGame.ratings.reduce((a, b) => a + b, 0) + rating) / (prevGame.ratings.length + 1)).toFixed(1),
          ratings: [...prevGame.ratings, rating],
          userRatings: { ...prevGame.userRatings, [user.id]: rating }
        }));
        toast({
          title: "Rating Submitted",
          description: `You rated ${game.title} ${rating} stars!`,
        });
      } else {
        throw new Error('Failed to submit rating');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit rating. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFavorite = () => {
    if (user) {
      toggleFavorite(game.id);
      setGame(prevGame => ({ ...prevGame, isFavorite: !prevGame.isFavorite }));
    } else {
      toast({
        title: "Login Required",
        description: "Please log in to favorite games.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Error</h1>
          <p className="text-red-500">{error}</p>
          <Link href="/">
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  if (!game) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold mb-6">{game.title}</h1>
        <div className="mb-6 relative aspect-video">
          <Image
            src={game.image}
            alt={game.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            <div className="flex">
              <AnimatePresence>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Star
                      className={`h-6 w-6 ${
                        star <= (game.averageRating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      } cursor-pointer`}
                      onClick={() => handleRating(star)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <span className="ml-2">{game.averageRating || 'N/A'}</span>
          </div>
          <Button
            variant="outline"
            onClick={handleFavorite}
            className={game.isFavorite ? "text-red-500" : ""}
          >
            <Heart className="mr-2 h-4 w-4" />
            {game.isFavorite ? "Favorited" : "Add to Favorites"}
          </Button>
        </div>
        <p className="text-lg mb-4">{game.description}</p>
        <div className="mb-4">
          <strong>Category:</strong> {game.category}
        </div>
        {game.isEmbedded ? (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={game.embeddedUrl}
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <Button className="bg-purple-600 hover:bg-purple-700">
            Play Now
          </Button>
        )}
      </div>
    </Layout>
  );
}