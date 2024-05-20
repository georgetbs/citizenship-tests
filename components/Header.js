import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export default function Header() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lang) => {
    localStorage.setItem('language', lang);
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  return (
    <header className="p-4 border-b-2 border-primary">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <span className="text-primary cursor-pointer">{t('welcome')}</span>
        </Link>
        <div>
          <Link href="/test?mode=exam">
            <span className="mr-4 cursor-pointer">{t('start_exam')}</span>
          </Link>
          <Link href="/test?mode=study">
            <span className="cursor-pointer">{t('study_mode')}</span>
          </Link>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="ml-4 border-2 border-primary p-1"
          >
            <option value="en">English</option>
            <option value="ru">Русский</option>
            <option value="ka">ქართული</option>
          </select>
        </div>
      </nav>
    </header>
  )
}

