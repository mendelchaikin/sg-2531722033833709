import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';
import ThemeToggle from './ThemeToggle';
import BackgroundSelector from './BackgroundSelector';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();
  const [background, setBackground] = useState('default');

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      setBackground(savedBackground);
    }
  }, []);

  const handleBackgroundChange = (newBackground) => {
    setBackground(newBackground);
    localStorage.setItem('selectedBackground', newBackground);
  };

  return (
    <div className={`min-h-screen bg-gray-900 dark:bg-gray-800 text-white flex flex-col transition-all duration-500 ease-in-out bg-${background}`}>
      <Header onSearch={searchGames} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        {children}
      </main>
      <Footer />
      <BackgroundSelector currentBackground={background} onSelectBackground={handleBackgroundChange} />
    </div>
  );
}