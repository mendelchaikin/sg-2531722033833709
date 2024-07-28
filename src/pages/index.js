import { useState } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import FeaturedGame from '@/components/FeaturedGame';
import GameGrid from '@/components/GameGrid';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { filteredGames, isLoading, error, filterByCategory } = useGameContext();
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 8;

  const featuredGame = filteredGames[0];
  const categories = ['All', ...new Set(filteredGames.map(game => game.category))];

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <Head>
        <title>Gaming Site - Play Awesome Games Online</title>
        <meta name="description" content="Discover and play the best online games on our gaming site. From action to puzzle, we have games for everyone." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedGame game={featuredGame} />
      <Categories categories={categories} onSelectCategory={filterByCategory} />
      {error && <p className="text-red-500 text-center my-4">{error}</p>}
      <GameGrid games={currentGames} isLoading={isLoading} />
      {filteredGames.length > gamesPerPage && (
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(Math.ceil(filteredGames.length / gamesPerPage))].map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "default" : "outline"}
              className={currentPage === index + 1 ? "bg-purple-600" : ""}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </Layout>
  );
}