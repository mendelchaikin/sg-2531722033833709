import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>We are passionate about bringing you the best online gaming experience.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-purple-500 transition-colors">Home</Link></li>
              <li><Link href="/categories" className="hover:text-purple-500 transition-colors">Categories</Link></li>
              <li><Link href="/new" className="hover:text-purple-500 transition-colors">New Games</Link></li>
              <li><Link href="/contact" className="hover:text-purple-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-purple-500 transition-colors">Facebook</a>
              <a href="#" className="text-white hover:text-purple-500 transition-colors">Twitter</a>
              <a href="#" className="text-white hover:text-purple-500 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Gaming Site. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}