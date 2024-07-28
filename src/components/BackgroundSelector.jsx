import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

const backgrounds = [
  { name: 'Default', value: 'default', preview: '🌈' },
  { name: 'Starry Night', value: 'starry-night', preview: '🌠' },
  { name: 'Ocean Waves', value: 'ocean-waves', preview: '🌊' },
  { name: 'Forest', value: 'forest', preview: '🌳' },
  { name: 'Geometric', value: 'geometric', preview: '🔷' },
];

export default function BackgroundSelector({ currentBackground, onSelectBackground }) {
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
        <div className="mt-2 p-2 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {backgrounds.map((bg) => (
            <Button
              key={bg.value}
              onClick={() => {
                onSelectBackground(bg.value);
                setIsOpen(false);
              }}
              className="flex items-center justify-between w-full text-left mb-2 last:mb-0"
              variant="ghost"
            >
              <span>{bg.preview} {bg.name}</span>
              {currentBackground === bg.value && <Check size={16} />}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}