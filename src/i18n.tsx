import i18n from 'i18next';
import common_en from './locales/en/translation.json';
import common_es from './locales/es/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    fallbackLng: "es",
    interpolation: { 
      escapeValue: false
    },
    resources: {
      en: {
        translation: common_en,
      },
      es: {
        translation: common_es,
      },
    },
  });

export default i18n;