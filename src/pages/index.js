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
    if (Array.isArray(initialGames) && initialGames.length > 0) {
      setGames(initialGames);
    }
    if (initialFeaturedGame) {
      setFeaturedGame(initialFeaturedGame);
    }
  }, [initialGames, initialFeaturedGame, setGames, setFeaturedGame]);

  const categories = [...new Set((games || []).map(game => game.category))];

  if (!games || games.length === 0) {
    return (
      <Layout>
        <div>No games available at the moment. Please check back later.</div>
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

export async function getServerSideProps() {
  try {
    console.log("Fetching initial games data...");
    // In a real application, you would fetch this data from an API or database
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
    
    const initialFeaturedGame = initialGames.length > 0 ? { ...initialGames[0] } : null;

    console.log("Initial games data fetched successfully.");
    console.log("Initial games count:", initialGames.length);
    console.log("Initial featured game:", initialFeaturedGame ? initialFeaturedGame.title : "None");

    return {
      props: {
        initialGames: initialGames.map(game => ({
          ...game,
          ratings: game.ratings.length, // Only send the count of ratings
          userRatings: {}, // Empty object for user ratings
        })),
        initialFeaturedGame: initialFeaturedGame ? {
          ...initialFeaturedGame,
          ratings: initialFeaturedGame.ratings.length,
          userRatings: {},
        } : null,
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