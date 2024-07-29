import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted - Client side log');
  }, []);

  console.log('Home component rendering - This should appear in server logs');

  return (
    <div>
      <h1>Welcome to the Gaming Site - Test Version</h1>
      <p>If you can see this, the page is working.</p>
    </div>
  );
};

export default Home;