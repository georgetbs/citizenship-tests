import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css';
import '../i18n';  // Ensure i18n is imported and initialized
import Footer from '@/components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}


export default appWithTranslation(MyApp);
