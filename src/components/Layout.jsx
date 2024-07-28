import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-800 text-white flex flex-col">
      <Header onSearch={searchGames} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
      <Footer />
    </div>
  );
}