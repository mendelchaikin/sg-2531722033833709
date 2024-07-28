import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Check, Shuffle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from '@/components/ui/use-toast';

const backgrounds = [
  { name: 'Default', value: 'default', preview: '🌈', description: 'Simple and clean default background' },
  { name: 'Starry Night', value: 'starry-night', preview: '🌠', description: 'A twinkling night sky' },
  { name: 'Ocean Waves', value: 'ocean-waves', preview: '🌊', description: 'Calming ocean waves' },
  { name: 'Forest', value: 'forest', preview: '🌳', description: 'Serene forest atmosphere' },
  { name: 'Geometric', value: 'geometric', preview: '🔷', description: 'Modern geometric patterns' },
];

export default function BackgroundSelector({ currentBackground, onSelectBackground }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isChanging, setIsChanging] = useState(false);
  const [previewBackground, setPreviewBackground] = useState(null);

  const handleRandomBackground = () => {
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    changeBackground(randomBg.value);
  };

  const changeBackground = async (bgValue) => {
    if (bgValue === currentBackground) {
      toast({
        title: "No Change",
        description: "This background is already selected.",
      });
      return;
    }

    try {
      setIsChanging(true);
      await onSelectBackground(bgValue);
      setIsOpen(false);
      const selectedBg = backgrounds.find(bg => bg.value === bgValue);
      toast({
        title: "Background Changed",
        description: `Background set to ${selectedBg.name}`,
      });
    } catch (error) {
      console.error('Error changing background:', error);
      toast({
        title: "Error",
        description: "Failed to change background. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsChanging(false);
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
              disabled={isChanging}
            >
              {isChanging ? (
                <span className="animate-spin mr-2">⌛</span>
              ) : isOpen ? (
                <ChevronDown className="mr-2" />
              ) : (
                <ChevronUp className="mr-2" />
              )}
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
            <TooltipProvider key={bg.value}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => changeBackground(bg.value)}
                    onMouseEnter={() => setPreviewBackground(bg.value)}
                    onMouseLeave={() => setPreviewBackground(null)}
                    className={`flex items-center justify-between w-full text-left mb-2 last:mb-0 ${currentBackground === bg.value ? 'bg-purple-600' : ''}`}
                    variant="ghost"
                    aria-label={`Select ${bg.name} background`}
                    role="menuitem"
                  >
                    <span>{bg.preview} {bg.name}</span>
                    {currentBackground === bg.value && <Check size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{bg.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
          <Button
            onClick={handleRandomBackground}
            className="flex items-center justify-between w-full text-left mt-2"
            variant="ghost"
            aria-label="Select random background"
            role="menuitem"
          >
            <span><Shuffle className="mr-2" /> Random</span>
          </Button>
        </div>
      )}
      {previewBackground && (
        <div className={`fixed inset-0 bg-${previewBackground} opacity-50 pointer-events-none transition-opacity duration-300`} />
      )}
    </div>
  );
}