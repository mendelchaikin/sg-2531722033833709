import "@/styles/globals.css";
import { GameProvider } from '@/context/GameContext';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from '@/components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default MyApp;