import Header from './Header';
import Footer from './Footer';
import ErrorBoundary from './ErrorBoundary';

export default function Layout({ children }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}