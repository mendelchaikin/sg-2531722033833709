import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function WelcomeSection() {
  const router = useRouter();

  const handleExplore = () => {
    router.push('/categories');
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg mb-8"
    >
      <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Gaming Site</h1>
      <p className="text-xl mb-6 text-gray-200">Discover, play, and connect with gamers from around the world!</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-purple-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition duration-300 shadow-md"
        onClick={handleExplore}
      >
        Explore Games
      </motion.button>
    </motion.section>
  );
}