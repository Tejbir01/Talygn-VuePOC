const messages = {
  en: {},
  es: {},
};
const i18n = new VueI18n({
  locale: "en", // set locale
  fallbackLocale: "es", // set fallback locale
  messages, // set locale messages
});
