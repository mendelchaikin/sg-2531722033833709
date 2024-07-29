import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted (client-side)');
    try {
      // Attempt to access window to ensure this only runs client-side
      if (typeof window !== 'undefined') {
        console.log('Window object is available');
      }
    } catch (error) {
      console.error('Error in Home component useEffect:', error);
    }
  }, []);

  console.log('Rendering Home component');
  return (
    <div>
      <h1>Welcome to the Gaming Site</h1>
      <p>This is a minimal example.</p>
    </div>
  );
};

// Add this to force server-side execution
export async function getServerSideProps() {
  console.log('Executing getServerSideProps in index.js');
  return { props: {} };
}

export default Home;