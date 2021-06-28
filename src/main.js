import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'


import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

import Multiselect from "vue-multiselect";
Vue.component("multiselect", Multiselect);

import RichText from "@juliushaertl/vue-richtext";
Vue.component(RichText);

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
