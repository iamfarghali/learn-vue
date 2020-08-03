<template>
  <v-row class="mt-12" justify="space-between">
    <v-col cols="8">
      <tasks />
    </v-col>
    <v-col cols="4">
      <add-task></add-task>
    </v-col>
  </v-row>
</template>

<script>
import Tasks from "@/components/tasks/Tasks";
import AddTask from "@/components/tasks/AddTask";

export default {
  name: "Home",
  components: {
    Tasks,
    AddTask
  }
};
</script>
