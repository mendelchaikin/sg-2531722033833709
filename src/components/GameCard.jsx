import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function GameCard({ game }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = (event) => {
    if (event.target.src.indexOf(game.image) !== -1 || event.target.src.indexOf(game.preview) !== -1) {
      setImageLoaded(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0 relative aspect-video">
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
                  src={game.preview}
                  alt={`${game.title} preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
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
                  src={game.image}
                  alt={game.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="lazy"
                />
              </motion.div>
            )}
          </AnimatePresence>
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {imageError && (
            <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700" aria-label={`Play ${game.title}`}>Play Now</Button>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-700 p-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">{game.title}</h3>
            <p className="text-sm text-gray-400">{game.category}</p>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}