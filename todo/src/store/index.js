import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [
      {
        id: 1,
        title: "Task 1",
        description: "Task Description...",
        duration: 4,
        start_at: "04:00",
        end_at: "09:00",
        day: "Sun"
      },
      {
        id: 2,
        title: "Task 2",
        description: "Task Description...",
        duration: 2,
        start_at: "04:00",
        end_at: "06:00",
        day: "Mon"
      },
      {
        id: 3,
        title: "Task 3",
        description: "Task Description...",
        duration: 1,
        start_at: "04:00",
        end_at: "05:00",
        day: "Sat"
      },
      {
        id: 4,
        title: "Task 4",
        description: "Task Description...",
        duration: 3,
        start_at: "04:00",
        end_at: "07:00",
        day: "Fri"
      }
    ]
  },
  mutations: {},
  actions: {}
});
