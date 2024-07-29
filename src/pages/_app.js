import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log('MyApp rendering - This should appear in server logs');

  return <Component {...pageProps} />;
}

export default MyApp;