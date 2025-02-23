import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import translationEn from "./locales/en-US/translation.json";
import translationTw from "./locales/zh-TW/translation.json";
import translationCn from "./locales/zh-CN/translation.json";
import { storage } from "@/store/mmkv";

const resources = {
  "zh-TW": { translation: translationTw },
  "zh-CN": { translation: translationCn },
  "en-US": { translation: translationEn },
};

const initI18n = async () => {
  let savedLanguage = storage?.getString("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: "zh-TW",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
