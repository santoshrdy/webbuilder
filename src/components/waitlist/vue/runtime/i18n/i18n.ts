import Vue from "vue";
import VueI18n from "vue-i18n";
import * as ES from "./es.json";
import * as EN from "./en.json";
import * as DE from "./de.json";
import * as EL from "./el.json";
import * as FR from "./fr.json";
import * as HE from "./he.json";
import * as IT from "./it.json";
import * as PL from "./pl.json";
import * as PT from "./pt.json";
import * as RU from "./ru.json";
import * as SV from "./sv.json";
import * as UK from "./uk.json";

Vue.use(VueI18n);

const messages = {
    en: EN,
    es: ES,
    de: DE,
    el: EL,
    fr: FR,
    he: HE,
    it: IT,
    pl: PL,
    pt: PT,
    ru: RU,
    sv: SV,
    uk: UK,
};

const i18n = new VueI18n({
    locale: localStorage.selectedLang !== undefined && localStorage.selectedLang !== "" ?
        localStorage.selectedLang : navigator.language, // set locale
    fallbackLocale: "en", // set fallback locale
    messages, // set locale messages
});

export default i18n;
