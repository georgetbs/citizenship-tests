import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function SelectLanguage() {
  const router = useRouter();
  const { t } = useTranslation('common');

  const handleLanguageSelect = (lang) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.push('/');
  };

  return (
    <div className="container mx-auto text-center p-10">
      <h1 className="text-3xl mb-8">{t('select_language')}</h1>
      <div className="space-y-4">
        <button onClick={() => handleLanguageSelect('en')} className="block p-4 border border-primary text-primary">English</button>
        <button onClick={() => handleLanguageSelect('ru')} className="block p-4 border border-primary text-primary">Русский</button>
        <button onClick={() => handleLanguageSelect('ka')} className="block p-4 border border-primary text-primary">ქართული</button>
      </div>
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
