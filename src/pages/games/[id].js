import { useRouter } from 'next/router';
import { useGameContext } from '@/context/GameContext';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Star, Heart, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { useState, useEffect } from 'react';
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
    console.log('GameDetailPage mounted', { id, gamesLength: games.length });
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
        <p className="text-lg mb-4">{game.description}</p>
        <div className="mb-4">
          <strong>Category:</strong> {game.category}
        </div>
        <div className="mb-4">
          <strong>Rating:</strong> {game.averageRating || 'N/A'}
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