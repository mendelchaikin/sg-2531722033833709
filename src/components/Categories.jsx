import { Button } from '@/components/ui/button';

export default function Categories({ categories }) {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            onClick={() => onSelectCategory(category)}
            className="bg-gray-700 hover:bg-gray-600"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}