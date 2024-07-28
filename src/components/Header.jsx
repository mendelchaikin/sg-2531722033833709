import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import LoginModal from './LoginModal';
import { useAuth } from '@/context/AuthContext';
import { useGameContext } from '@/context/GameContext';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const { searchGames } = useGameContext();

  const handleSearch = (e) => {
    e.preventDefault();
    searchGames(searchQuery);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-gray-800 py-4 sticky top-0 z-10"
    >
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500 flex items-center">
          <span className="mr-2">🎮</span> Gaming Site
        </Link>
        <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4 my-2 relative">
          <Input
            type="text"
            placeholder="Search games..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </form>
        <nav className="w-full sm:w-auto">
          <ul className="flex flex-wrap justify-center sm:space-x-4">
            <li><Link href="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
            <li><Link href="/categories" className="hover:text-purple-500 transition-colors">Categories</Link></li>
            <li><Link href="/new" className="hover:text-purple-500 transition-colors">New Games</Link></li>
            {user && <li><Link href="/profile" className="hover:text-purple-500 transition-colors">Profile</Link></li>}
          </ul>
        </nav>
        {user ? (
          <div className="flex items-center space-x-4">
            <span>Welcome, {user.name}</span>
            <Button variant="outline" onClick={logout} className="bg-purple-600 hover:bg-purple-700 text-white">
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsLoginModalOpen(true)} className="bg-purple-600 hover:bg-purple-700 text-white mt-2 sm:mt-0">
            Login
          </Button>
        )}
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </motion.header>
  );
}