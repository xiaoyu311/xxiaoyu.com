import i18n from 'i18n';

i18n.configure({
  locales: ['zh-CN', 'en-US'],
  cookie: 'locale',
  queryParameter: 'locale',
  defaultLocale: 'en-US',
  objectNotation: true,
  syncFiles: false,
});

export default i18n;