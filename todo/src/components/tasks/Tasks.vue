<template>
  <div>
    <div v-if="loading" class="text-center my-12">
      <v-progress-circular
        indeterminate
        color="purple darken-2"
      ></v-progress-circular>
    </div>
    <div v-else>
      <v-list dense>
        <task v-for="task in tasks" :task="task" :key="task.id"></task>
      </v-list>
      <div class="text-center my-4">
        <v-pagination
          v-model="pagination.current"
          :length="pagination.total_pages"
          color="purple darken-2"
          @input="getTasks()"
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "@/components/tasks/Task";
export default {
  name: "Tasks",
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.getTasks();
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
    pagination() {
      return this.$store.state.pagination;
    }
  },
  components: {
    Task
  },
  methods: {
    getTasks() {
      this.loading = true;
      this.$store
        .dispatch("getTasksAction")
        .then(() => {})
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style></style>
