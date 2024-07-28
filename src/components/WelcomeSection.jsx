import { motion } from 'framer-motion';

export default function WelcomeSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg shadow-lg mb-8"
    >
      <h1 className="text-4xl font-bold mb-4">Welcome to Gaming Site</h1>
      <p className="text-xl mb-6">Discover, play, and connect with gamers from around the world!</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-purple-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300"
      >
        Explore Games
      </motion.button>
    </motion.section>
  );
}