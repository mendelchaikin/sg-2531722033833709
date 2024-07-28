import { useState } from 'react';
import Layout from '@/components/Layout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeaturedGame from '@/components/FeaturedGame';
import GameGrid from '@/components/GameGrid';
import Categories from '@/components/Categories';
import { useGameContext } from '@/context/GameContext';

export default function Home() {
  const { filteredGames, searchGames, filterByCategory } = useGameContext();
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
      <Header onSearch={searchGames} />
      <main className="container mx-auto px-4 py-8">
        <FeaturedGame game={featuredGame} />
        <Categories categories={categories} onSelectCategory={filterByCategory} />
        <GameGrid games={currentGames} />
        {filteredGames.length > gamesPerPage && (
          <div className="flex justify-center mt-8">
            {[...Array(Math.ceil(filteredGames.length / gamesPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === index + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </Layout>
  );
}