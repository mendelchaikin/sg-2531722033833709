import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { useGameContext } from '@/context/GameContext';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function EmbeddedGamesPage() {
  const { user, loading } = useAuth();
  const { games } = useGameContext();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== 'admin') {
        router.push('/');
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  const embeddedGames = games.filter(game => game.isEmbedded);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Embedded Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {embeddedGames.map(game => (
          <Card key={game.id}>
            <CardHeader>
              <CardTitle>{game.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Category: {game.category}</p>
              <Link href={`/games/${game.id}`} className="text-blue-500 hover:underline">
                View Game
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}