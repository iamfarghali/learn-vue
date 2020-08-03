import Vue from "vue";
import Vuex from "vuex";
import tasksApi from "../gateways/tasksApi";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    pagination: { current: 1, total_pages: 0 },
    jwt:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC90b2RvLnRlc3RcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1OTU5MjUzMDMsImV4cCI6MTU5NjM1NzMwMywibmJmIjoxNTk1OTI1MzAzLCJqdGkiOiJhSk9udjRuV281ZEUzaFlZIiwic3ViIjoyMSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.4E5epodsa4SuLcYApcYiuZnJXMQbk4p5ZQSD2Y5QxNE"
  },
  mutations: {
    ADD_TASK(state, payload) {
      state.tasks.unshift(payload);
      state.tasks.pop();
    },
    GET_TASKS(state, payload) {
      if (payload.tasks) {
        state.tasks = payload.tasks;
        state.pagination = payload.pagination;
      }
    }
  },
  actions: {
    getTasksAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        tasksApi
          .get("", {
            params: { page: state.pagination.current, token: state.jwt }
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
    addTaskAction({ commit, state }, task) {
      return new Promise((resolve, reject) => {
        tasksApi
          .post("", {
            token: state.jwt,
            name: task.name,
            task_day: task.day,
            start_at: task.start_at,
            end_at: task.end_at,
            description: task.description
          })
          .then(({ data }) => {
            commit("ADD_TASK", data.data);
            resolve(data);
          })
          .catch(err => reject(err));
      });
    }
  }
});
