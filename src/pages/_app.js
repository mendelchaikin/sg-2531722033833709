import "@/styles/globals.css";

function MyApp({ Component, pageProps }) {
  console.log('Rendering MyApp');
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
}

MyApp.getInitialProps = async (appContext) => {
  console.log('MyApp.getInitialProps called');
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;