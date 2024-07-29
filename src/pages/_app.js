import "@/styles/globals.css";
import { GameProvider } from '@/context/GameContext';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;