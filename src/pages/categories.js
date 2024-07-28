import Layout from '@/components/Layout';
import { sampleGames } from '@/data/sampleGames';
import { Button } from '@/components/ui/button';

export default function Categories() {
  const categories = [...new Set(sampleGames.map(game => game.category))];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Game Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-24 text-lg font-semibold"
          >
            {category}
          </Button>
        ))}
      </div>
    </Layout>
  );
}