import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-center py-4">
        <p>&copy; 2024 Gaming Site. All rights reserved.</p>
      </footer>
    </div>
  );
}