<template>
  <div class="my-1 pb-3">
    <v-list-item three-line>
      <v-list-item-action class="mr-2">
        <v-checkbox
          v-if="!loading"
          @change="toggleTaskDone()"
          v-model="done"
          color="green lighten-1"
        >
        </v-checkbox>
        <v-progress-circular
          v-else
          :indeterminate="loading"
          :value="0"
          size="22"
          color="green lighten-1"
        ></v-progress-circular>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          :class="{
            'text-decoration-line-through green--text lighten-1': done
          }"
          class="black--text lighten-4"
          >{{ task.name }}</v-list-item-title
        >
        <v-list-item-subtitle>{{ task.description }}</v-list-item-subtitle>
        <v-list-item-subtitle>{{
          `${task.duration} Hour(s). Start at ${task.start_at}, End at ${task.end_at}`
        }}</v-list-item-subtitle>
      </v-list-item-content>

      <div>
        <v-list-item-action class="mx-0" v-show="!done && !deleteIt">
          <v-btn icon @click="editTask()" :disabled="loading">
            <v-icon color="primary darken-1">mdi-pencil-box-outline</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action v-show="!deleteIt" class="mx-0">
          <v-btn icon @click="deleteIt = !deleteIt" :disabled="loading">
            <v-icon color="red darken-1">mdi-trash-can-outline</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action v-show="deleteIt" class="mx-0">
          <v-btn
            text
            color="red darken-1"
            small
            @click="deleteTask()"
            :disabled="loading"
          >
            <v-icon small class="mr-1"
              >mdi-checkbox-marked-circle-outline</v-icon
            >
            Yes, Delete it.
          </v-btn>
        </v-list-item-action>

        <v-list-item-action v-show="deleteIt" class="mx-0">
          <v-btn
            text
            color="green darken-1"
            small
            @click="cancelDelete()"
            :disabled="loading"
          >
            <v-icon small class="mr-1">mdi-cancel</v-icon>
            Cancel.
          </v-btn>
        </v-list-item-action>
      </div>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      done: this.task.done,
      loading: false,
      deleteIt: false
    };
  },
  methods: {
    editTask() {
      this.$store.state.taskToUpdate = this.task;
    },
    toggleTaskDone() {
      this.$store.state.taskToUpdate = null;
      this.loading = true;
      const payload = {
        id: this.task.id,
        done: this.done,
        user_id: this.task.user_id
      };
      this.$store
        .dispatch("toggleTaskDoneAction", payload)
        .then(data => {
          this.done = data.data.done;
        })
        .catch(err => {
          this.done = false;
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    cancelDelete() {
      this.deleteIt = false;
    },
    deleteTask() {
      this.loading = true;
      const payload = {
        id: this.task.id,
        user_id: this.task.user_id
      };
      this.$store
        .dispatch("deleteTaskAction", payload)
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
