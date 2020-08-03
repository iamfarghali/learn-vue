<template>
  <div>
    <v-list-item three-line>
      <v-list-item-action class="mr-2">
        <v-checkbox v-model="done" color="purple darken-1"></v-checkbox>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          :class="{ 'text-decoration-line-through': done }"
          class="purple--text darken-1"
          >{{ task.name }}</v-list-item-title
        >

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
      done: this.task.done
    };
  },
  methods: {
    toggle() {
      this.done = !this.done;
    }
  }
};
</script>

<style></style>
