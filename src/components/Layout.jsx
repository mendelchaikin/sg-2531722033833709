import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header onSearch={searchGames} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}