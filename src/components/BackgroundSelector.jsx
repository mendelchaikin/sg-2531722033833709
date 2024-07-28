import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check, Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const backgrounds = [
  { name: 'Default', value: 'default', preview: '🌈', description: 'Simple and clean default background', image: '/backgrounds/default-preview.jpg' },
  { name: 'Starry Night', value: 'starry-night', preview: '🌠', description: 'A twinkling night sky', image: '/backgrounds/starry-night-preview.jpg' },
  { name: 'Ocean Waves', value: 'ocean-waves', preview: '🌊', description: 'Calming ocean waves', image: '/backgrounds/ocean-waves-preview.jpg' },
  { name: 'Forest', value: 'forest', preview: '🌳', description: 'Serene forest atmosphere', image: '/backgrounds/forest-preview.jpg' },
  { name: 'Geometric', value: 'geometric', preview: '🔷', description: 'Modern geometric patterns', image: '/backgrounds/geometric-preview.jpg' },
];

export default function BackgroundSelector({ currentBackground, onSelectBackground }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    backgrounds.forEach((bg) => {
      const img = new Image();
      img.src = bg.image;
      img.onload = () => setLoadedImages(prev => ({ ...prev, [bg.value]: true }));
    });
  }, []);

  const handleRandomBackground = () => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    onSelectBackground(randomBg.value);
    setIsOpen(false);
  };

  const handleKeyDown = (e, bgValue) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onSelectBackground(bgValue);
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-purple-600 hover:bg-purple-700 text-white"
              aria-label="Change background"
              aria-expanded={isOpen}
            >
              {isOpen ? <ChevronDown className="mr-2" /> : <ChevronUp className="mr-2" />}
              Change Background
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to change the background</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isOpen && (
        <div className="mt-2 p-2 bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto animate-fadeIn" role="menu">
          {backgrounds.map((bg) => (
            <Tooltip key={bg.value}>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => {
                    onSelectBackground(bg.value);
                    setIsOpen(false);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, bg.value)}
                  className="flex items-center justify-between w-full text-left mb-2 last:mb-0"
                  variant="ghost"
                  aria-label={`Select ${bg.name} background`}
                  role="menuitem"
                >
                  <span className="flex items-center">
                    {loadedImages[bg.value] && (
                      <Image
                        src={bg.image}
                        alt={`${bg.name} preview`}
                        width={30}
                        height={30}
                        className="mr-2 rounded"
                      />
                    )}
                    {bg.preview} {bg.name}
                  </span>
                  {currentBackground === bg.value && <Check size={16} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{bg.description}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          <Button
            onClick={handleRandomBackground}
            onKeyDown={(e) => handleKeyDown(e, 'random')}
            className="flex items-center justify-between w-full text-left mt-2"
            variant="ghost"
            aria-label="Select random background"
            role="menuitem"
          >
            <span><Shuffle className="mr-2" /> Random</span>
          </Button>
        </div>
      )}
    </div>
  );
}