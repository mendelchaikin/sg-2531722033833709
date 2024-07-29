import "@/styles/globals.css";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log('MyApp mounted - UNIQUE_IDENTIFIER_67890');
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error caught:', message, source, lineno, colno, error);
    };
  }, []);

  console.log('MyApp rendering - UNIQUE_IDENTIFIER_67890');

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. - UNIQUE_IDENTIFIER_67890</h1>;
    }

    return this.props.children;
  }
}

export default MyApp;