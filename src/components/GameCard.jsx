import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function GameCard({ game }) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-0 relative">
          {imageError ? (
            <div className="w-full h-48 bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">{game.title}</span>
            </div>
          ) : (
            <Image
              src={game.image}
              alt={game.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700">Play Now</Button>
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