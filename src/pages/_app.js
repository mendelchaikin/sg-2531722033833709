import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log('Rendering MyApp');
  return <Component {...pageProps} />;
}

export default MyApp;