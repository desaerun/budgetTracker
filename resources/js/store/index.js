import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        errors: [],
        token: localStorage.getItem('access_token') || null,
    },
    getters: {
        errors: state => state.errors,
        loggedIn(state) {
            return state.token != null;
        },
    },
    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        },
        retrieveToken(state,token) {
            state.token = token;
        },
        destroyToken(state) {
            state.token = null;
        },
    },
    actions: {},
    modules: {
        auth
    }
})
