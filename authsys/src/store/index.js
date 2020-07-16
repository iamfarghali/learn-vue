import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null
  },
  mutations: {
    UPDATE_USER(state, payload) {
      state.user = payload;
    },
    UPDATE_TOKEN(state, payload) {
      state.token = payload;
    },
    UPDATE_LOGGEDIN(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(payload.endpoint, {
            email: payload.email,
            password: payload.password
          })
          .then(({ data }) => {
            commit("UPDATE_USER", data.data.user);
            commit("UPDATE_TOKEN", data.data.access_token);
            commit("UPDATE_LOGGEDIN", true);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logoutAction({ commit, getters }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(payload.endpoint, {
            token: getters.get_token
          })
          .then(({ data }) => {
            commit("UPDATE_USER", null);
            commit("UPDATE_TOKEN", null);
            commit("UPDATE_LOGGEDIN", false);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    registerAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(payload.endpoint, {
            name: payload.name,
            email: payload.email,
            password: payload.password
          })
          .then(({ data }) => {
            commit("UPDATE_USER", data.data.user);
            commit("UPDATE_TOKEN", data.data.access_token);
            commit("UPDATE_LOGGEDIN", true);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  getters: {
    get_token(state) {
      return state.token;
    },
    get_user(state) {
      return state.user;
    },
    get_loggedIn(state) {
      return state.loggedIn;
    }
  },
  plugins: [new VuexPersistence().plugin]
});
