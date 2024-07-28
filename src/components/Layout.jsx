import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { useGameContext } from '@/context/GameContext';
import ThemeToggle from './ThemeToggle';
import BackgroundSelector from './BackgroundSelector';
import ErrorBoundary from './ErrorBoundary';

export default function Layout({ children }) {
  const { searchGames } = useGameContext();
  const [background, setBackground] = useState('default');
  const [isChangingBackground, setIsChangingBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedBackground = localStorage.getItem('selectedBackground');
    if (savedBackground) {
      setBackground(savedBackground);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsChangingBackground(true);
      setTimeout(() => setIsChangingBackground(false), 300);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleBackgroundChange = (newBackground) => {
    return new Promise((resolve) => {
      setIsChangingBackground(true);
      setBackground(newBackground);
      localStorage.setItem('selectedBackground', newBackground);
      setTimeout(() => {
        setIsChangingBackground(false);
        resolve();
      }, 500);
    });
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-gray-900 dark:bg-gray-800 text-white flex flex-col transition-all duration-500 ease-in-out bg-${background} ${isChangingBackground ? 'opacity-50' : 'opacity-100'}`}>
        <Header onSearch={searchGames} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
        <BackgroundSelector currentBackground={background} onSelectBackground={handleBackgroundChange} />
      </div>
    </ErrorBoundary>
  );
}