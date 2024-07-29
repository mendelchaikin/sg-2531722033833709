import { useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import { sampleGames } from '@/data/sampleGames';

export async function getServerSideProps() {
  return {
    props: {
      initialGames: sampleGames,
    },
  };
}

const Home = ({ initialGames }) => {
  const { setGames } = useGameContext();

  useEffect(() => {
    setGames(initialGames);
    console.log('Home component mounted - Client side log');
  }, [setGames, initialGames]);

  console.log('Home component rendering - This should appear in server logs');

  return (
    <Layout>
      <WelcomeSection />
      <PopularGames games={initialGames} />
      <Categories categories={[...new Set(initialGames.map(game => game.category))]} />
    </Layout>
  );
};

export default Home;