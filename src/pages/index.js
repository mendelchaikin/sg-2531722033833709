import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted - UNIQUE_IDENTIFIER_12345');
  }, []);

  return (
    <div>
      <h1>Welcome to the Gaming Site - UNIQUE_IDENTIFIER_12345</h1>
      <p>This is a minimal example.</p>
    </div>
  );
};

export default Home;