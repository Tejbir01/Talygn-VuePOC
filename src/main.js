import { createApp } from "vue";
import { createPinia } from "pinia";
import BootstrapVue3 from 'bootstrap-vue-3'
import { createI18n } from 'vue-i18n'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import i18n from '@/localization'
import App from "./App.vue";
import router from "./router";
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import commonMixin from '@/assets/common/vue-common.js'
import ListingcommonMixin from '@/assets/common/vue-commonList.js'
import ListingStatus from './components/Common/ListingStatus.vue'
import Pager from './components/Common/Pager.vue'
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import vSelect from "vue-select";
import Datepicker from "@vuepic/vue-datepicker";
import VueTelInput from 'vue3-tel-input'
import NumberInput from './components/Common/NumericField.vue'



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import "/Content/css/ThemeNew/custom.css";
import "/Content/css/ThemeNew/default.css";
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';
import 'vue3-tel-input/dist/vue3-tel-input.css'
import "vue-select/dist/vue-select.css";
import '@vuepic/vue-datepicker/dist/main.css';

const app = createApp(App);

app.config.globalProperties.$filters = {
    formatDate(value) {
        if (value) {
            return moment(String(value), "YYYY-MM-DD").format(String('MM/DD/YYYY').toUpperCase())
        }
    }
}

defineRule('required', value => {
    if (!value || !value.length) {
        return false;
    }
    return true;
});
defineRule('email', value => {
    // Field is empty, should pass
    if (!value || !value.length) {
        return true;
    }
    // Check if email
    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
        return false;
    }
    return true;
});

configure({
    // Generates an English message locale generator
    generateMessage: localize('en', {
        messages: {
            required: '{field} is required.',
            email:'{field} must be a valid email.'
        },
    }),
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true, 
    validateOnModelUpdate: true
});

app.config.productionTip = false

app.mixin([commonMixin, ListingcommonMixin]);

app.component('listing-status', ListingStatus)
app.component('Pager', Pager)
app.component('Form', Form)
app.component('Field', Field)
app.component('ErrorMessage', ErrorMessage)
app.component('vue-tel-input', VueTelInput)
app.component("v-select", vSelect)
app.component("date-picker", Datepicker)
app.component('number-input', NumberInput)
app.use(createPinia());
app.use(router);//.use(VueI18n);
app.use(BootstrapVue3);
app.use(i18n);
app.use(VueToast, {
    // One of the options
    position: 'top'
})
app.use(PerfectScrollbar);

//app.use(VueMeta);
//Vue.prototype.$http = axios;
await router.isReady()
app.mount("#app");

