import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import GameManagement from '@/components/GameManagement';
import { Loader2, Download, Star } from 'lucide-react';
import { useGameContext } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const { games, exportGames } = useGameContext();
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

  const totalGames = games.length;
  const embeddedGames = games.filter(game => game.isEmbedded).length;
  const regularGames = totalGames - embeddedGames;
  const averageRating = (games.reduce((sum, game) => sum + (parseFloat(game.averageRating) || 0), 0) / totalGames).toFixed(1);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Games</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalGames}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Regular Games</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{regularGames}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Embedded Games</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{embeddedGames}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold flex items-center">
              {averageRating} <Star className="ml-1 h-5 w-5 text-yellow-400 fill-current" />
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Link href="/embedded-games">
          <Button>View Embedded Games</Button>
        </Link>
        <Button onClick={exportGames}>
          <Download className="mr-2 h-4 w-4" />
          Export Game Data
        </Button>
      </div>
      <GameManagement />
    </Layout>
  );
}