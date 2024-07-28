import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setNewGame(prev => ({ ...prev, isEmbedded: e.target.checked }));
  };

  const handleAddGame = (e) => {
    e.preventDefault();
    if (newGame.title && newGame.category) {
      addGame(newGame);
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
        description: `${newGame.title} has been added successfully.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Title and category are required.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveGame = (gameId) => {
    removeGame(gameId);
    toast({
      title: "Game Removed",
      description: "The game has been removed successfully.",
    });
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
        <Button type="submit">Add Game</Button>
      </form>

      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Games</h2>
        <ul className="space-y-2">
          {games.map(game => (
            <li key={game.id} className="flex justify-between items-center">
              <span>{game.title} {game.isEmbedded ? '(Embedded)' : ''}</span>
              <Button onClick={() => handleRemoveGame(game.id)} variant="destructive">Remove</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}