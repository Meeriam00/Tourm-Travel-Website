import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import az from './az.json';

const storedLanguage = localStorage.getItem('language'); 

i18n
  .use(initReactI18next)  
  .init({
    resources: {
      en: {
        translation: en  
      },
      az: {
        translation: az  
      }
    },
    lng: storedLanguage || 'en', 
    fallbackLng: 'en',  
    interpolation: {
      escapeValue: false  
    }
  });


i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
