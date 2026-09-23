import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './content/en';
import { languages } from './content/config';

let saved = 'en';
try { saved = localStorage.getItem('portfolio-language') || 'en'; } catch { /* Storage is optional. */ }
void i18n.use(initReactI18next).init({
  resources: Object.fromEntries(languages.map(({ id }) => [id, { translation: en }])),
  lng: languages.some(({ id }) => id === saved) ? saved : 'en',
  fallbackLng: 'en', interpolation: { escapeValue: false },
});
document.documentElement.lang = i18n.language;
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language;
  try { localStorage.setItem('portfolio-language', language); } catch { /* Storage is optional. */ }
});
export default i18n;
