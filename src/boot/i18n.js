import { boot } from "quasar/wrappers";
import { createI18n, useI18n } from "vue-i18n";
import en from "src/i18n/en-US/index";

const i18n = createI18n({
  locale: "en-US",
  globalInjection: true,
  messages: { en },
});
export default boot(({ app }) => {
  app.use(i18n);
});

export { i18n, useI18n };
