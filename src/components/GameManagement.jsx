import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function GameManagement() {
  const { games, addGame, removeGame } = useGameContext();
  const [newGame, setNewGame] = useState({
    title: '',
    category: '',
    image: '',
    preview: '',
    description: '',
    isEmbedded: false,
    embeddedUrl: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setNewGame(prev => ({ ...prev, isEmbedded: e.target.checked }));
  };

  const handleAddGame = async (e) => {
    e.preventDefault();
    if (newGame.title && newGame.category) {
      setIsLoading(true);
      try {
        const response = await fetch('/api/games/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newGame),
        });
        const data = await response.json();
        if (response.ok) {
          addGame(data.game);
          setNewGame({
            title: '',
            category: '',
            image: '',
            preview: '',
            description: '',
            isEmbedded: false,
            embeddedUrl: '',
          });
          toast({
            title: "Game Added",
            description: `${data.game.title} has been added successfully.`,
          });
        } else {
          throw new Error(data.message || 'Failed to add game');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast({
        title: "Error",
        description: "Title and category are required.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveGame = async (gameId) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/games/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: gameId }),
      });
      const data = await response.json();
      if (response.ok) {
        removeGame(gameId);
        toast({
          title: "Game Removed",
          description: "The game has been removed successfully.",
        });
      } else {
        throw new Error(data.message || 'Failed to remove game');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddGame} className="space-y-4">
        <h2 className="text-2xl font-bold">Add New Game</h2>
        <Input
          name="title"
          value={newGame.title}
          onChange={handleInputChange}
          placeholder="Game Title"
          required
        />
        <Input
          name="category"
          value={newGame.category}
          onChange={handleInputChange}
          placeholder="Category"
          required
        />
        <Input
          name="image"
          value={newGame.image}
          onChange={handleInputChange}
          placeholder="Image URL"
        />
        <Input
          name="preview"
          value={newGame.preview}
          onChange={handleInputChange}
          placeholder="Preview URL"
        />
        <Input
          name="description"
          value={newGame.description}
          onChange={handleInputChange}
          placeholder="Description"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isEmbedded"
            checked={newGame.isEmbedded}
            onCheckedChange={handleCheckboxChange}
          />
          <label htmlFor="isEmbedded">Is Embedded Game</label>
        </div>
        {newGame.isEmbedded && (
          <Input
            name="embeddedUrl"
            value={newGame.embeddedUrl}
            onChange={handleInputChange}
            placeholder="Embedded Game URL"
          />
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Add Game
        </Button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Games</h2>
        <ul className="space-y-2">
          {games.map(game => (
            <li key={game.id} className="flex justify-between items-center">
              <span>{game.title} {game.isEmbedded ? '(Embedded)' : ''}</span>
              <Button onClick={() => handleRemoveGame(game.id)} variant="destructive" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}