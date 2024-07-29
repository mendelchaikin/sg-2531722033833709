import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    console.log('MyDocument: getInitialProps called');
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    console.log('MyDocument: Rendering');
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script dangerouslySetInnerHTML={{
            __html: `
              console.log('Custom script executed');
              window.onerror = function(message, source, lineno, colno, error) {
                console.error('Global error caught:', message, 'at', source, lineno, colno, error);
              };
            `
          }} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;