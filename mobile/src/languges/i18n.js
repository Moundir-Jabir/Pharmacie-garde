import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';


import english from './english.json';
import arabic from './arabic.json';
import french from './french.json';


i18next.use(initReactI18next).init({

    compatibilityJSON: 'v3',

    lng: 'en',

    resources: {
        en: english,
        ar: arabic,
        fr: french
    },

    react: {
        useSuspense: false
    }

});

export default i18next;