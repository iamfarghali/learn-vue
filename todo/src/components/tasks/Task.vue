<template>
  <div>
    <v-list-item three-line>
      <v-list-item-action class="mr-2">
        <v-checkbox v-model="active" color="purple darken-1"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title class="purple--text darken-1">{{
          task.title
        }}</v-list-item-title>

        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>

        <v-list-item-subtitle>{{
          `${task.duration} Hours. Start at ${task.start_at}, End at ${task.end_at}`
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      active: false
    };
  },
  methods: {
    toggle() {
      this.active = !this.active;
    }
  }
};
</script>

<style></style>
