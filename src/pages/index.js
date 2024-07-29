import { useEffect } from 'react';

const Home = ({ message }) => {
  useEffect(() => {
    console.log('Home component mounted');
  }, []);

  console.log('Rendering Home component');
  return (
    <div>
      <h1>Welcome to the Gaming Site</h1>
      <p>{message}</p>
    </div>
  );
};

export async function getServerSideProps() {
  console.log("Starting getServerSideProps");
  try {
    console.log("Preparing message");
    const message = "This is a test message from the server.";
    console.log("Message prepared:", message);
    return { props: { message } };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return { props: { message: "An error occurred" } };
  } finally {
    console.log("Finished getServerSideProps");
  }
}

export default Home;