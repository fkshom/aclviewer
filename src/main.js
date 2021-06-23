
import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios' //追記
import VueAxios from 'vue-axios' //追記
import Multiselect from '@vueform/multiselect'

const app = createApp(App)
app.use(VueAxios, axios)
// app.use(Multiselect, axios)
app.mount('#app')
