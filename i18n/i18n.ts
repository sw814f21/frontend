import * as Localization from 'expo-localization';
import enMessages from "./en";
import daMessages from "./da";

let i18n = require('i18n-js')

i18n.translations = {
    en: enMessages,
    da: daMessages
}

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;