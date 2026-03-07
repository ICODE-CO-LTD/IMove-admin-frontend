import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import rw from './locales/rw.json';
import sw from './locales/sw.json';
import fr from './locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      rw: { translation: rw },
      sw: { translation: sw },
      fr: { translation: fr },
    },
    lng: 'rw',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React handles escaping
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
