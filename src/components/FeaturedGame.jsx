import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function FeaturedGame({ game }) {
  return (
    <div className="relative h-96 rounded-lg overflow-hidden mb-8">
      <Image
        src={game.image}
        alt={game.title}
        layout="fill"
        objectFit="cover"
        className="brightness-50"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black to-transparent">
        <h2 className="text-4xl font-bold mb-2">{game.title}</h2>
        <p className="text-lg mb-4">{game.description}</p>
        <Button className="w-40 bg-purple-600 hover:bg-purple-700">Play Now</Button>
      </div>
    </div>
  );
}