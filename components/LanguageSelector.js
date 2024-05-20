import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const languageFlags = {
  en: '🇬🇧',
  ru: '🇷🇺',
  ka: '🇬🇪',
};

export default function LanguageSelector() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { language } = i18n;
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {languageFlags[language]} {language.toUpperCase()}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              onClick={() => changeLanguage('en')}
              className={`block px-4 py-2 text-xl text-gray-700 w-full text-left ${language === 'en' ? 'bg-gray-100' : ''}`}
              role="menuitem"
            >
              🇬🇧 English
            </button>
            <button
              onClick={() => changeLanguage('ru')}
              className={`block px-4 py-2 text-xl text-gray-700 w-full text-left ${language === 'ru' ? 'bg-gray-100' : ''}`}
              role="menuitem"
            >
              🇷🇺 Русский
            </button>
            <button
              onClick={() => changeLanguage('ka')}
              className={`block px-4 py-2 text-xl text-gray-700 w-full text-left ${language === 'ka' ? 'bg-gray-100' : ''}`}
              role="menuitem"
            >
              🇬🇪 ქართული
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
