import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const backgrounds = [
  { name: 'Default', value: 'default' },
  { name: 'Starry Night', value: 'starry-night' },
  { name: 'Ocean Waves', value: 'ocean-waves' },
  { name: 'Forest', value: 'forest' },
  { name: 'Geometric', value: 'geometric' },
];

export default function BackgroundSelector({ onSelectBackground }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        {isOpen ? <ChevronDown className="mr-2" /> : <ChevronUp className="mr-2" />}
        Change Background
      </Button>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-800 rounded-lg shadow-lg">
          {backgrounds.map((bg) => (
            <Button
              key={bg.value}
              onClick={() => {
                onSelectBackground(bg.value);
                setIsOpen(false);
              }}
              className="block w-full text-left mb-2 last:mb-0"
              variant="ghost"
            >
              {bg.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}