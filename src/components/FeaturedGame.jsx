import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function FeaturedGame({ game }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  if (!game) {
    return <FeaturedGameSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative aspect-video rounded-lg overflow-hidden mb-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={game.preview || '/placeholder-image.jpg'}
              alt={`${game.title} preview`}
              fill
              sizes="100vw"
              className="object-cover brightness-50"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
          </motion.div>
        ) : (
          <motion.div
            key="image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={game.image || '/placeholder-image.jpg'}
              alt={game.title || 'Game image'}
              fill
              sizes="100vw"
              className="object-cover brightness-50"
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!imageLoaded && !imageError && <FeaturedGameSkeleton />}
      {imageError && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-4xl font-bold mb-2">{game.title || 'Game Title'}</h2>
        <p className="text-lg mb-4">{game.description || 'Game description not available.'}</p>
        <Button className="w-40 bg-purple-600 hover:bg-purple-700" aria-label={`Play ${game.title || 'this game'}`}>Play Now</Button>
      </div>
    </motion.div>
  );
}

function FeaturedGameSkeleton() {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-gray-800">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-full mb-4" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}