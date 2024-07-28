import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGameContext } from '@/context/GameContext';
import dynamic from 'next/dynamic';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';

const Confetti = dynamic(() => import('canvas-confetti'), { ssr: false });

export default function GameCard({ game, onFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const { user } = useAuth();
  const { rateGame } = useGameContext();

  useEffect(() => {
    if (user && game.userRatings && game.userRatings[user.id]) {
      setUserRating(game.userRatings[user.id]);
    }
  }, [user, game.userRatings]);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  const handlePlayNow = () => {
    if (typeof window !== 'undefined') {
      Confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRating = async (rating) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to rate games.",
        variant: "destructive",
      });
      return;
    }

    setIsRating(true);
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
        setUserRating(rating);
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
    } finally {
      setIsRating(false);
    }
  };

  if (!game) {
    return null;
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <CardContent className="p-0 relative aspect-video">
          <motion.div
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={game.image}
              alt={game.title}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad}
              onError={handleImageError}
            />
          </motion.div>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={game.preview}
              alt={`${game.title} preview`}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={handleImageLoad}
              onError={handleImageError}
            />
          </motion.div>
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Link href={`/games/${game.id}`}>
              <Button 
                className="bg-purple-600 hover:bg-purple-700" 
                aria-label={`View details for ${game.title}`}
              >
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-700 p-4 mt-auto flex flex-col items-start">
          <div className="flex justify-between items-center w-full mb-2">
            <h3 className="text-lg font-semibold">{game.title}</h3>
            {user && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFavorite(game.id)}
                aria-label={`Favorite ${game.title}`}
              >
                <Heart className={game.isFavorite ? "text-red-500" : "text-gray-400"} />
              </Button>
            )}
          </div>
          <p className="text-sm text-gray-400 mb-2">{game.category}</p>
          <div className="flex items-center mb-2">
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
                      className={`h-5 w-5 ${
                        star <= (userRating || game.averageRating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-400'
                      } cursor-pointer ${isRating ? 'pointer-events-none' : ''}`}
                      onClick={() => handleRating(star)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <span className="ml-2">{game.averageRating || 'N/A'}</span>
          </div>
          <p className="text-sm text-gray-400">
            {game.ratings ? `${game.ratings.length} ratings` : 'No ratings yet'}
          </p>
          {userRating > 0 && (
            <p className="text-sm text-green-400 mt-1">
              Your rating: {userRating} stars
            </p>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}