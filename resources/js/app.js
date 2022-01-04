require('./bootstrap');

import Vue from 'vue'
import App from './AppBase.vue'
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VModal from 'vue-js-modal';
import VueToastify from 'vue-toastify';
import VueRouter from 'vue-router';
import router from '@/router';

import store from "./store";
window.Vue = Vue;
Vue.use(VModal);
Vue.use(VueToastify);

Vue.use(VueRouter);

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.commit("auth/setUserData", null);
            localStorage.removeItem("authToken");
            router.push({ name: "Login" });
        } else {
            return Promise.reject(error);
        }
    }
);

axios.interceptors.request.use(function (config) {
    config.headers.common = {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
        Accept: "application/json"
    };

    return config;
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
