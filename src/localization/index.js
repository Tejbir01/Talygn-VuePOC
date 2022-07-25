import { createI18n } from 'vue-i18n'

import ID from './id'
import EN from './en'
import JP from './jp'
import ZH from './zh'

export default new createI18n({
    locale: 'EN', // set locale
    fallbackLocale: 'EN', // set fallback locale
    allowComposition: true, // you need to specify that!
    messages: {
        ID,
        EN,
        JP,
        ZH
    }, // set locale messages
})
//export default i18n;
