import { useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturedGame from '@/components/FeaturedGame';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import RandomGameRecommendation from '@/components/RandomGameRecommendation';
import GamingFactOfTheDay from '@/components/GamingFactOfTheDay';
import { useGameContext } from '@/context/GameContext';

export default function Home({ initialGames, initialFeaturedGame }) {
  const { games, featuredGame, filterByCategory, setGames, setFeaturedGame } = useGameContext();

  useEffect(() => {
    if (initialGames) {
      setGames(initialGames);
    }
    if (initialFeaturedGame) {
      setFeaturedGame(initialFeaturedGame);
    }
  }, [initialGames, initialFeaturedGame, setGames, setFeaturedGame]);

  const categories = [...new Set(games.map(game => game.category))];

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

export async function getServerSideProps() {
  // In a real application, you would fetch this data from an API or database
  const initialGames = [
    // ... your initial games data
  ];
  const initialFeaturedGame = initialGames[0]; // or select a random game

  return {
    props: {
      initialGames,
      initialFeaturedGame,
    },
  };
}