import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '../components/Header';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';

const LanguageSelector = dynamic(() => import('../components/LanguageSelector'), { ssr: false });

export default function Home() {
  const { t } = useTranslation('common');
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage) {
      setIsLanguageSelectorOpen(true);
    }
  }, []);

  return (
    <div className="container mx-auto">
      <LanguageSelector
        isOpen={isLanguageSelectorOpen}
        onClose={() => setIsLanguageSelectorOpen(false)}
      />
      <Header />
      <main className="text-center p-10">
        <h1 className="text-3xl mb-8">{t('welcome')}</h1>
        <div className="space-y-4">
          <Link href="/test?mode=exam" passHref>
            <span className="block p-4 border-2 border-primary text-primary cursor-pointer">
              {t('start_exam')}
            </span>
          </Link>
          <Link href="/test?mode=study" passHref>
            <span className="block p-4 border-2 border-primary text-primary cursor-pointer">
              {t('study_mode')}
            </span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
