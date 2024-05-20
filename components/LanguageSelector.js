import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

export default function LanguageSelector({ isOpen, onClose }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lang) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/`;
    router.push(router.pathname, router.asPath, { locale: lang });
    onClose();
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      router.push(router.pathname, router.asPath, { locale: savedLanguage });
      onClose();
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl mb-4">{t('select_language')}</h2>
        <button onClick={() => changeLanguage('en')} className="p-2 m-2 border-2 border-primary">
          English
        </button>
        <button onClick={() => changeLanguage('ru')} className="p-2 m-2 border-2 border-primary">
          Русский
        </button>
        <button onClick={() => changeLanguage('ka')} className="p-2 m-2 border-2 border-primary">
          ქართული
        </button>
      </div>
    </div>
  );
}
