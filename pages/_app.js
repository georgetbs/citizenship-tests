import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import '../i18n';  // Ensure i18n is imported and initialized

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
