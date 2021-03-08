import axios from "axios";

export default {
    namespaced: true,
    state: {
        token: localStorage.getItem('access_token') || null,
        userData: null,
    },
    getters: {
        user: state => state.userData,
    },
    mutations: {
        setUserData(state, user) {
            state.userData = user;
        }
    },
    actions: {
        loggedIn(state) {
            return state.token != null;
        },
        getUserData({commit}) {
            axios
                .get(process.env.VUE_APP_API_URL + "user")
                .then(response => {
                    commit("setUserData", response.data);
                })
                .catch(() => {
                    localStorage.removeItem("access_token");
                })
        },
        sendLoginRequest({commit}, data) {
            commit("setErrors", {}, {root: true});
            return axios
                .post(process.env.VUE_APP_API_URL + "login", data)
                .then(response => {
                    commit("setUserData", response.data.user);
                    localStorage.setItem("access_token", response.data.token);
                });
        },
        sendRegisterRequest({commit}, data) {
            commit("setErrors", {}, {root: true});
            return axios
                .post(process.env.VUE_APP_API_URL + "register", data)
                .then(response => {
                    commit("setUserData", response.data.user);
                    localstorage.setItem("access_token", response.data.token);
                });
        },
        sendLogoutRequest({commit}) {
            axios.post(process.env.VUE_APP_API_URL + "logout").then(() => {
                commit("setUserData", null);
                localStorage.removeItem("authToken");
            });
        },
        sendVerifyResendRequest() {
            return axios.get(process.env.VUE_APP_API_URL + "email/resend");
        },
        sendVerifyRequest({dispatch}, hash) {
            return axios
                .get(process.env.VUE_APP_API_URL + "email/verify/" + hash)
                .then(() => {
                    dispatch("getUserData");
                });
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve,reject) => {
                axios.post('api/login', {
                    username: credentials.username,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.access_token;
                        localStorage.setItem('access_token', token);
                        context.commit('retrieveToken', token);
                        resolve(response);
                    })
                    .catch(error => {
                        console.log(error);
                        reject(error);
                    })
            })
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
            if(context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('api/logout', {})
                        .then(response => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            resolve(response);
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token');
                            context.commit('destroyToken');
                            console.log(error);
                            reject(error);
                        })
                })
            }
        },
    }
}
