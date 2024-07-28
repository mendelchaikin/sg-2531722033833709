import Layout from '@/components/Layout';
import FeaturedGame from '@/components/FeaturedGame';
import GameGrid from '@/components/GameGrid';
import PopularGames from '@/components/PopularGames';
import { sampleGames } from '@/data/sampleGames';

export default function Home() {
  const featuredGame = sampleGames[0];

  return (
    <Layout>
      <FeaturedGame game={featuredGame} />
      <PopularGames games={sampleGames} />
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Games</h2>
        <GameGrid games={sampleGames} />
      </section>
    </Layout>
  );
}