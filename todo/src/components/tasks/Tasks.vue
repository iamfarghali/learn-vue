<template>
  <v-row class="mt-12" justify="space-between">
    <v-col cols="8">
      <v-list dense>
        <task v-for="task in tasks" :task="task" :key="task.id"></task>
      </v-list>
    </v-col>
    <v-col cols="4">
      <add-task></add-task>
    </v-col>
  </v-row>
</template>

<script>
import Task from "@/components/tasks/Task";
import AddTask from "@/components/tasks/AddTask";
export default {
  name: "Tasks",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks;
    }
  },
  components: {
    Task,
    AddTask
  },
  methods: {
    addTask() {
      this.loading = true;
      // dispatsh action
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    }
  }
};
</script>

<style></style>
