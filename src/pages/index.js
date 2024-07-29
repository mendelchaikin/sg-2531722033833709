import { useEffect } from 'react';
import Layout from '@/components/Layout';
import WelcomeSection from '@/components/WelcomeSection';
import FeaturedGame from '@/components/FeaturedGame';
import PopularGames from '@/components/PopularGames';
import Categories from '@/components/Categories';
import RandomGameRecommendation from '@/components/RandomGameRecommendation';
import GamingFactOfTheDay from '@/components/GamingFactOfTheDay';
import { useGameContext } from '@/context/GameContext';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = ({ initialGames, initialFeaturedGame }) => {
  const { games, featuredGame, filterByCategory, setGames, setFeaturedGame } = useGameContext();

  useEffect(() => {
    if (Array.isArray(initialGames) && initialGames.length > 0) {
      setGames(initialGames);
    }
    if (initialFeaturedGame) {
      setFeaturedGame(initialFeaturedGame);
    }
  }, [initialGames, initialFeaturedGame, setGames, setFeaturedGame]);

  const categories = [...new Set((games || []).map(game => game.category))];

  return (
    <ErrorBoundary>
      <Layout>
        <WelcomeSection />
        {featuredGame && <FeaturedGame game={featuredGame} />}
        <PopularGames games={games} />
        <Categories categories={categories} onSelectCategory={filterByCategory} />
        <RandomGameRecommendation />
        <GamingFactOfTheDay />
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
        preview: "https://picsum.photos/400/225?random=2",
        description: "This is a sample game description.",
        ratings: [4, 5, 3],
        averageRating: "4.0",
        isFavorite: false,
        isEmbedded: false,
      },
      {
        id: 2,
        title: "Sample Game 2",
        category: "Adventure",
        image: "https://picsum.photos/400/225?random=3",
        preview: "https://picsum.photos/400/225?random=4",
        description: "Another sample game description.",
        ratings: [5, 4, 5],
        averageRating: "4.7",
        isFavorite: false,
        isEmbedded: false,
      }
    ];
    
    console.log("Initial games data fetched successfully.");
    console.log("Initial games count:", initialGames.length);

    return {
      props: {
        initialGames,
        initialFeaturedGame: initialGames[0] || null,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        initialGames: [],
        initialFeaturedGame: null,
      },
    };
  }
}

export default Home;