import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturedGame from '@/components/FeaturedGame';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import RandomGameRecommendation from '@/components/RandomGameRecommendation';
import GamingFactOfTheDay from '@/components/GamingFactOfTheDay';
import { useGameContext } from '@/context/GameContext';

export default function Home() {
  const { games, featuredGame } = useGameContext();

  const categories = [...new Set(games.map(game => game.category))];

  return (
    <Layout>
      <WelcomeSection />
      {featuredGame && <FeaturedGame game={featuredGame} />}
      <PopularGames games={games} />
      <Categories categories={categories} onSelectCategory={() => {}} />
      <RandomGameRecommendation />
      <GamingFactOfTheDay />
    </Layout>
  );
}