import Vue from "vue";
import Vuex from "vuex";
import tasksApi from "../gateways/tasksApi";
tasksApi.defaults.headers.common["Authorization"] =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90b2RvLnRlc3RcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1OTY0NTY2NDksImV4cCI6MTU5Njg4ODY0OSwibmJmIjoxNTk2NDU2NjQ5LCJqdGkiOiJMZVBwSmxqbmd5MjY2Wm9kIiwic3ViIjoyMSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.Y23qThI2keC2ePEEArR_s4-I7LUg3rfUD-5NiPRD_wg";

Vue.use(Vuex);
const today = new Date().toISOString().substr(0, 10);
export default new Vuex.Store({
  state: {
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
    todayDate: today,
    pagination: { current: 1, total_pages: 0 }
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.unshift(payload);
      if (state.tasks.length >= 6) {
        state.tasks.pop();
        state.pagination.total_pages = 2;
      }
    },
    UPDATE_TASK() {
      console.log("Task Updated.");
    },
    DELETE_TASK(state) {
      console.log("Task Deleted.");
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
    }
  },
  actions: {
    getTasksAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        tasksApi
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
        tasksApi
          .post("", task)
          .then(({ data }) => {
            commit("ADD_TASK", data.data);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    updateTaskAction({ commit }, task) {
      return new Promise((resolve, reject) => {
        tasksApi
          .put(`/${task.id}`, task)
          .then(({ data }) => {
            commit("UPDATE_TASK");
            resolve(data);
          })
          .catch(err => reject(err));
      });
    },
    toggleTaskDoneAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        tasksApi
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
        console.log(payload);
        tasksApi
          .delete(`${payload.id}`, payload)
          .then(({ data }) => {
            commit("DELETE_TASK");
            dispatch("getTasksAction").then(() => {
              resolve(data);
            });
          })
          .catch(err => reject(err));
      });
    }
  }
});
