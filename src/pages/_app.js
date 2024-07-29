import "@/styles/globals.css";
import { GameProvider } from '@/context/GameContext';

function MyApp({ Component, pageProps }) {
  console.log('MyApp rendering - This should appear in server logs');

  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
}

export default MyApp;