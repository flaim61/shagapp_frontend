import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import './assets/css/bootstrap.min.css'
import './assets/css/animate.css'
import './assets/css/font-awesome.min.css'
import './assets/css/prettyPhoto.css'
import './assets/css/price-range.css'
import './assets/css/responsive.css'
import './assets/css/main.css'

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const app = createApp(App)

app.use(router)
app.mount('#app')
app.use(VueSweetalert2);
app.use(VueAxios, axios)
