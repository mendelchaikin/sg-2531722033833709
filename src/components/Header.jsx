import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-500">
          Gaming Site
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
            <li><Link href="/categories" className="hover:text-purple-500 transition-colors">Categories</Link></li>
            <li><Link href="/new" className="hover:text-purple-500 transition-colors">New Games</Link></li>
          </ul>
        </nav>
        <Button variant="outline" className="bg-purple-600 hover:bg-purple-700 text-white">
          Login
        </Button>
      </div>
    </header>
  );
}