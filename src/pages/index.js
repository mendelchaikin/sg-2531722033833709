import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    console.log('Home component mounted (client-side)');
  }, []);

  console.log('Rendering Home component');
  return (
    <div>
      <h1>Welcome to the Gaming Site</h1>
      <p>This is a minimal example.</p>
    </div>
  );
};

export async function getServerSideProps() {
  console.log('Executing getServerSideProps for Home page');
  return {
    props: {}
  };
}

export default Home;