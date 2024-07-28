import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchQuery);
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
          </ul>
        </nav>
        <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white mt-2 sm:mt-0">
          Login
        </Button>
      </div>
    </motion.header>
  );
}