import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import { GameProvider } from '@/context/GameContext';
import { ThemeProvider } from 'next-themes';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <GameProvider>
          <Component {...pageProps} />
          <Toaster />
        </GameProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}