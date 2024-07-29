import { useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturedGame from '@/components/FeaturedGame';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = ({ initialGames }) => {
  const { games, setGames, filterByCategory } = useGameContext();

  useEffect(() => {
    console.log('Home component mounted');
    if (Array.isArray(initialGames) && initialGames.length > 0) {
      console.log('Setting initial games:', initialGames);
      setGames(initialGames);
    }
  }, [initialGames, setGames]);

  const categories = [...new Set((games || []).map(game => game.category))];

  console.log('Rendering Home component');
  return (
    <ErrorBoundary>
      <Layout>
        <WelcomeSection />
        {games.length > 0 && <FeaturedGame game={games[0]} />}
        <PopularGames games={games} />
        <Categories categories={categories} onSelectCategory={filterByCategory} />
      </Layout>
    </ErrorBoundary>
  );
};

export async function getServerSideProps() {
  try {
    console.log("Fetching initial games data...");
    const initialGames = [
      {
        id: 1,
        title: "Sample Game 1",
        category: "Action",
        image: "https://picsum.photos/400/225?random=1",
        description: "This is a sample game description.",
        averageRating: "4.0",
      },
      {
        id: 2,
        title: "Sample Game 2",
        category: "Adventure",
        image: "https://picsum.photos/400/225?random=3",
        description: "Another sample game description.",
        averageRating: "4.7",
      }
    ];
    
    console.log("Initial games data fetched successfully.");
    console.log("Initial games count:", initialGames.length);

    return { props: { initialGames } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { initialGames: [] } };
  }
}

export default Home;