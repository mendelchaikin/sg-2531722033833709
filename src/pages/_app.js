import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import { GameProvider } from '@/context/GameContext';

export default function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <GameProvider>
        <Component {...pageProps} />
        <Toaster />
      </GameProvider>
    </ErrorBoundary>
  );
}