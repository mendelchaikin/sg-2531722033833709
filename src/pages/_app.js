import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log('Rendering MyApp');
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;