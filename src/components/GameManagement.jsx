import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Edit, Save, X } from 'lucide-react';

export default function GameManagement() {
  const { games, addGame, removeGame, updateGame } = useGameContext();
  const [newGame, setNewGame] = useState({
    title: '',
    category: '',
    image: '',
    preview: '',
    description: '',
    isEmbedded: false,
    embeddedUrl: '',
  });
  const [editingGame, setEditingGame] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e, gameState, setGameState) => {
    const { name, value } = e.target;
    setGameState(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked, gameState, setGameState) => {
    setGameState(prev => ({ ...prev, isEmbedded: checked }));
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

  const handleEditGame = (game) => {
    setEditingGame({ ...game });
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/games/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingGame),
      });
      const data = await response.json();
      if (response.ok) {
        updateGame(data.game);
        setEditingGame(null);
        toast({
          title: "Game Updated",
          description: `${data.game.title} has been updated successfully.`,
        });
      } else {
        throw new Error(data.message || 'Failed to update game');
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

  const cancelEdit = () => {
    setEditingGame(null);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleAddGame} className="space-y-4">
        <h2 className="text-2xl font-bold">Add New Game</h2>
        <Input
          name="title"
          value={newGame.title}
          onChange={(e) => handleInputChange(e, newGame, setNewGame)}
          placeholder="Game Title"
          required
        />
        <Input
          name="category"
          value={newGame.category}
          onChange={(e) => handleInputChange(e, newGame, setNewGame)}
          placeholder="Category"
          required
        />
        <Input
          name="image"
          value={newGame.image}
          onChange={(e) => handleInputChange(e, newGame, setNewGame)}
          placeholder="Image URL"
        />
        <Input
          name="preview"
          value={newGame.preview}
          onChange={(e) => handleInputChange(e, newGame, setNewGame)}
          placeholder="Preview URL"
        />
        <Input
          name="description"
          value={newGame.description}
          onChange={(e) => handleInputChange(e, newGame, setNewGame)}
          placeholder="Description"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isEmbedded"
            checked={newGame.isEmbedded}
            onCheckedChange={(checked) => handleCheckboxChange(checked, newGame, setNewGame)}
          />
          <label htmlFor="isEmbedded">Is Embedded Game</label>
        </div>
        {newGame.isEmbedded && (
          <Input
            name="embeddedUrl"
            value={newGame.embeddedUrl}
            onChange={(e) => handleInputChange(e, newGame, setNewGame)}
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
        <ul className="space-y-4">
          {games.map(game => (
            <li key={game.id} className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-lg">
              {editingGame && editingGame.id === game.id ? (
                <>
                  <Input
                    name="title"
                    value={editingGame.title}
                    onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                    placeholder="Game Title"
                  />
                  <Input
                    name="category"
                    value={editingGame.category}
                    onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                    placeholder="Category"
                  />
                  <Input
                    name="image"
                    value={editingGame.image}
                    onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                    placeholder="Image URL"
                  />
                  <Input
                    name="preview"
                    value={editingGame.preview}
                    onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                    placeholder="Preview URL"
                  />
                  <Input
                    name="description"
                    value={editingGame.description}
                    onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                    placeholder="Description"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`isEmbedded-${game.id}`}
                      checked={editingGame.isEmbedded}
                      onCheckedChange={(checked) => handleCheckboxChange(checked, editingGame, setEditingGame)}
                    />
                    <label htmlFor={`isEmbedded-${game.id}`}>Is Embedded Game</label>
                  </div>
                  {editingGame.isEmbedded && (
                    <Input
                      name="embeddedUrl"
                      value={editingGame.embeddedUrl}
                      onChange={(e) => handleInputChange(e, editingGame, setEditingGame)}
                      placeholder="Embedded Game URL"
                    />
                  )}
                  <div className="flex space-x-2">
                    <Button onClick={handleSaveEdit} disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                      Save
                    </Button>
                    <Button onClick={cancelEdit} variant="outline">
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-bold">{game.title} {game.isEmbedded ? '(Embedded)' : ''}</span>
                  <span>Category: {game.category}</span>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleEditGame(game)} variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button onClick={() => handleRemoveGame(game.id)} variant="destructive" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Remove
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}