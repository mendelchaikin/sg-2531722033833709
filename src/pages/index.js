import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturedGame from '@/components/FeaturedGame';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import RandomGameRecommendation from '@/components/RandomGameRecommendation';
import GamingFactOfTheDay from '@/components/GamingFactOfTheDay';
import { useGameContext } from '@/context/GameContext';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { games, featuredGame, filterByCategory, isLoading } = useGameContext();

  const categories = [...new Set(games.map(game => game.category))];

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <WelcomeSection />
      {featuredGame && <FeaturedGame game={featuredGame} />}
      <PopularGames games={games} />
      <Categories categories={categories} onSelectCategory={filterByCategory} />
      <RandomGameRecommendation />
      <GamingFactOfTheDay />
    </Layout>
  );
}