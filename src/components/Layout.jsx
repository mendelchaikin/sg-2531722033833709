import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';
import ThemeToggle from './ThemeToggle';
import BackgroundSelector from './BackgroundSelector';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();
  const [background, setBackground] = useState('default');

  const handleBackgroundChange = (newBackground) => {
    setBackground(newBackground);
  };

  return (
    <div className={`min-h-screen bg-gray-900 dark:bg-gray-800 text-white flex flex-col bg-${background}`}>
      <Header onSearch={searchGames} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
      <Footer />
      <BackgroundSelector onSelectBackground={handleBackgroundChange} />
    </div>
  );
}