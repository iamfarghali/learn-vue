import Vue from "vue";
import Vuex from "vuex";
import client from "../gateways/client";
Vue.use(Vuex);
const today = new Date().toISOString().substr(0, 10);
export default new Vuex.Store({
  state: {
    jwt: null,
    tasks: [],
    task: {
      id: null,
      name: null,
      description: null,
      start_at: null,
      end_at: null,
      task_day: today,
      user_id: null
    },
    taskToUpdate: null,
    isUpdateLoading: false,
    todayDate: today,
    pagination: { current: 1, total_pages: 0 },
    letsLogin: false,
    isUserLoggedIn: false
  },
  mutations: {
    ADD_TASK(state, payload) {
      if (state.pagination.current == 1) {
        state.tasks.unshift(payload);
      }
      if (state.tasks.length >= 6) {
        state.tasks.pop();
        if (state.pagination.total_pages == 1) {
          state.pagination.total_pages = 2;
        }
      }
    },
    UPDATE_TASK() {
      console.log("Task Updated.");
    },
    DELETE_TASK(state) {
      if (state.taskToUpdate != null) {
        state.taskToUpdate = null;
      }
      state.pagination.current =
        state.pagination.current > 1 && state.tasks.length == 1
          ? state.pagination.current - 1
          : state.pagination.current;
    },
    GET_TASKS(state, payload) {
      if (payload.tasks) {
        state.tasks = payload.tasks;
        state.pagination = payload.pagination;
      } else {
        state.tasks = [];
        state.pagination.current = 1;
        state.pagination.total_pages = 0;
      }
    },
    REGISTER_USER(state) {
      state.letsLogin = true;
      console.log("REGISTER_USER");
    },
    LOGIN_USER(state, data) {
      localStorage.setItem("jwt", data.access_token);
      state.jwt = data.access_token;
      state.isUserLoggedIn = true;
      client.tasks.defaults.headers["Authorization"] = `Bearer ${state.jwt}`;
    },
    PERSIST_JWT_IN_STORE(state) {
      state.jwt = localStorage.getItem("jwt");
      state.isUserLoggedIn = state.jwt ? true : false;
      client.tasks.defaults.headers["Authorization"] = `Bearer ${state.jwt}`;
    }
  },
  actions: {
    getTasksAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        client.tasks
          .get("", {
            params: { page: state.pagination.current }
          })
          .then(({ data }) => {
            commit("GET_TASKS", data.data);
            resolve(data.data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addTaskAction({ commit }, task) {
      return new Promise((resolve, reject) => {
        client.tasks
          .post("", task)
          .then(({ data }) => {
            commit("ADD_TASK", data.data);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    updateTaskAction({ commit, state }, task) {
      state.isUpdateLoading = true;
      return new Promise((resolve, reject) => {
        client.tasks
          .put(`/${task.id}`, task)
          .then(({ data }) => {
            commit("UPDATE_TASK");
            state.isUpdateLoading = false;
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    toggleTaskDoneAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        client.tasks
          .put(`${payload.id}/done`, payload)
          .then(({ data }) => {
            commit("UPDATE_TASK");
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    deleteTaskAction({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        client.tasks
          .delete(`${payload.id}`, payload)
          .then(({ data }) => {
            commit("DELETE_TASK");
            dispatch("getTasksAction").then(() => {
              resolve(data);
            });
          })
          .catch(err => reject(err));
      });
    },
    registerAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        client.register
          .post("", payload)
          .then(({ data }) => {
            commit("REGISTER_USER");
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    loginAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        client.login
          .post("", payload)
          .then(({ data }) => {
            commit("LOGIN_USER", data);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    }
  }
});
