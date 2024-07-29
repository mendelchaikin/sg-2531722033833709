import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log('MyApp: Rendering with props:', { pageProps });
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;