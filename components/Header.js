import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import LanguageSelector from './LanguageSelector';

export default function Header() {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { mode } = router.query;

  const handleNavigation = (path) => {
    if (mode) {
      const confirmNavigation = confirm(t('confirm_navigation'));
      if (!confirmNavigation) return;
    }
    router.push(path);
  };

  return (
    <header className="p-4 border-b-2 border-primary flex justify-between items-center">
      <h1 className="text-2xl hidden md:block">{t('header_title')}</h1>
      <nav className="flex-grow text-center">
        <ul className="flex space-x-4 justify-center">
          <li>
            <button onClick={() => handleNavigation('/')} className="text-primary hover:underline">
              {t('home')}
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/test?mode=study')} className="text-primary hover:underline">
              {t('study')}
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigation('/test?mode=exam')} className="text-primary hover:underline">
              {t('exam')}
            </button>
          </li>
        </ul>
      </nav>
      {router.pathname === '/' && <LanguageSelector />}
    </header>
  );
}
