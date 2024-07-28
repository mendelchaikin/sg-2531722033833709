import GameCard from './GameCard';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function GameGrid({ games, isLoading, onFavorite }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} onFavorite={onFavorite} />
      ))}
    </motion.div>
  );
}

function GameCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <Skeleton className="w-full aspect-video" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}