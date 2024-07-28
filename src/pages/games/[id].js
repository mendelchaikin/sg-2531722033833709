import { useRouter } from 'next/router';
import { useGameContext } from '@/context/GameContext';
import Layout from '@/components/Layout';

export default function EmbeddedGamePage() {
  const router = useRouter();
  const { id } = router.query;
  const { games } = useGameContext();

  const game = games.find(g => g.id === parseInt(id));

  if (!game || !game.isEmbedded) {
    return (
      <Layout>
        <h1 className="text-3xl font-bold mb-6">Game Not Found</h1>
        <p>The requested game does not exist or is not an embedded game.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{game.title}</h1>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={game.embeddedUrl}
          className="w-full h-full"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}