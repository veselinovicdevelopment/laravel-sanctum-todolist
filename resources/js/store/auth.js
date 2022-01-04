import axios from "axios";
import router from '../router';

export default {
    namespaced: true,

    state: {
        userData: null
    },

    getters: {
        user: state => state.userData
    },

    mutations: {
        setUserData(state, user) {
            state.userData = user;
        }
    },

    actions: {
        getUserData({ commit }) {
            axios
                .get("/api/user")
                .then(response => {
                    commit("setUserData", response.data);
                })
                .catch(() => {
                    localStorage.removeItem("authToken");
                });
        },
        async sendLoginRequest({ commit }, data) {
            return axios
                .post("/api/login", data)
                .then(response => {
                    if (response.data) {
                        commit("setUserData", response.data.user);
                        localStorage.setItem("authToken", response.data.token);
                        router.push({ path: "/auth/todo-dashboard" });
                    }
                });
        },
        async sendRegisterRequest({ commit }, data) {
            return axios
                .post("/api/register", data)
                .then(response => {
                    if (response.data) {
                        commit("setUserData", response.data.user);
                        localStorage.setItem("authToken", response.data.token);
                    }
                });
        },
        sendLogoutRequest({ commit }) {
            axios.post("/api/logout").then(() => {
                commit("setUserData", null);
                localStorage.removeItem("authToken");
            });
        },
    }
};
