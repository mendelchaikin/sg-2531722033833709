import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';
import ThemeToggle from './ThemeToggle';
import BackgroundSelector from './BackgroundSelector';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();
  const [background, setBackground] = useState('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      setBackground(savedBackground);
    }
  }, []);

  const handleBackgroundChange = (newBackground) => {
    setIsTransitioning(true);
    setBackground(newBackground);
    localStorage.setItem('selectedBackground', newBackground);
  };

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className={`min-h-screen bg-gray-900 dark:bg-gray-800 text-white flex flex-col transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'} bg-${background}`}>
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