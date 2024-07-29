import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import GamingFactOfTheDay from '@/components/GamingFactOfTheDay';
import RandomGameRecommendation from '@/components/RandomGameRecommendation';
import { useGameContext } from '@/context/GameContext';

export default function Home() {
  const { games } = useGameContext();

  return (
    <Layout>
      <WelcomeSection />
      <PopularGames games={games} />
      <Categories categories={['Action', 'Adventure', 'Puzzle', 'Strategy', 'Sports']} />
      <GamingFactOfTheDay />
      <RandomGameRecommendation />
    </Layout>
  );
}