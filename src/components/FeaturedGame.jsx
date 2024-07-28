import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturedGame({ game }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
              src={game.preview}
              alt={`${game.title} preview`}
              fill
              sizes="100vw"
              className="object-cover brightness-50"
              onLoadingComplete={() => setImageLoaded(true)}
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
              sizes="100vw"
              className="object-cover brightness-50"
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-4xl font-bold mb-2">{game.title}</h2>
        <p className="text-lg mb-4">{game.description}</p>
        <Button className="w-40 bg-purple-600 hover:bg-purple-700">Play Now</Button>
      </div>
    </motion.div>
  );
}