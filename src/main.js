import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './font/iconfont.js'
import axios from 'axios'
import config from './api/config'
const localStore = require('store');
const jquery = require('jquery');
const axiosInit = axios.create(config);

Vue.use(VueRouter)
Vue.use(ElementUI)
//添加一个请求拦截器

Vue.prototype.$ajax = axiosInit;
Vue.prototype.$jquery = jquery;
Vue.prototype.$localStore = localStore;


const router = new VueRouter({
    routes:routes,

})
let app = new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)

})

export {
    app
}
