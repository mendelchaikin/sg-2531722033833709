import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function FeaturedGame({ game }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-96 rounded-lg overflow-hidden mb-8"
    >
      {imageError ? (
        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
          <span className="text-4xl text-gray-500">{game.title}</span>
        </div>
      ) : (
        <Image
          src={game.image}
          alt={game.title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          onError={handleImageError}
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-4xl font-bold mb-2">{game.title}</h2>
        <p className="text-lg mb-4">{game.description}</p>
        <Button className="w-40 bg-purple-600 hover:bg-purple-700">Play Now</Button>
      </div>
    </motion.div>
  );
}