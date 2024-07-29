import { useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import { sampleGames } from '@/data/sampleGames';

export async function getServerSideProps() {
  const initialFeaturedGame = sampleGames[0] || null; // Ensure it's not undefined
  return {
    props: {
      initialFeaturedGame,
    },
  };
}

const Home = ({ initialFeaturedGame }) => {
  const { setGames } = useGameContext();

  useEffect(() => {
    setGames(sampleGames);
    console.log('Home component mounted - Client side log');
  }, [setGames]);

  console.log('Home component rendering - This should appear in server logs');

  return (
    <Layout>
      <WelcomeSection />
      <PopularGames games={sampleGames} />
      <Categories categories={[...new Set(sampleGames.map(game => game.category))]} />
    </Layout>
  );
};

export default Home;