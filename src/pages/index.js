import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import { sampleGames } from '@/data/sampleGames';

export default function Home() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Gaming Site</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Games</h2>
        <GameGrid games={sampleGames} />
      </section>
    </Layout>
  );
}