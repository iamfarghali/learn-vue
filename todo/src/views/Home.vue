<template>
  <v-row class="my-16" justify="space-between">
    <v-col
      cols="10"
      offset="1"
      sm="8"
      offset-sm="2"
      md="7"
      offset-md="0"
      lg="8"
      offset-lg="0"
    >
      <tasks />
    </v-col>
    <v-col
      cols="10"
      offset="1"
      sm="8"
      offset-sm="2"
      md="5"
      offset-md="0"
      lg="4"
      offset-lg="0"
    >
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
