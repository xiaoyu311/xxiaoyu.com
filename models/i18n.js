import i18n from 'i18n';
console.log(__dirname)

i18n.configure({
  locales: ['zh-CN', 'en-US'],
  cookie: 'locale',
  queryParameter: 'locale',
  defaultLocale: 'zh-CN',
  objectNotation: true,
  syncFiles: false,
  directory: __dirname + '/../language' // 默认解析文件
});

export default i18n;