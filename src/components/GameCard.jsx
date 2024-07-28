import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GameCard({ game }) {
  return (
    <Card className="overflow-hidden bg-gray-800 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Image
          src={game.image}
          alt={game.title}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{game.title}</h3>
          <p className="text-sm text-gray-400 mb-2">{game.category}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-700 p-4">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Play Now</Button>
      </CardFooter>
    </Card>
  );
}