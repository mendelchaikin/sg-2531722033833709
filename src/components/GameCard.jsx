import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GameCard({ game }) {
  return (
    <Card className="overflow-hidden bg-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0 relative">
        <Image
          src={game.image}
          alt={game.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
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
  );
}