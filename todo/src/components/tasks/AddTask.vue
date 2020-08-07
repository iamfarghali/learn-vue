<template>
  <v-card outlined>
    <v-card-text>
      <v-container>
        <v-row>
          <v-form
            ref="form"
            class="col-12"
            v-model="valid"
            :lazy-validation="true"
          >
            <v-text-field
              label="Name"
              v-model="task.name"
              :rules="taskRules.name"
              required
            ></v-text-field>

            <v-text-field
              label="Description"
              v-model="task.description"
              required
            ></v-text-field>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="10"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="task.task_day"
                  label="Task Day"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="task.task_day"
                @input="menu2 = false"
                :min="todayDate"
                no-title
              ></v-date-picker>
            </v-menu>
            <v-text-field
              label="Start At"
              v-model="task.start_at"
              type="time"
              :rules="taskRules.start_at"
              required
            ></v-text-field>
            <v-text-field
              label="End At"
              v-model="task.end_at"
              type="time"
              :rules="taskRules.end_at"
              required
            ></v-text-field>
          </v-form>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn
        class="text-capitalize"
        color="purple darken-3"
        text
        small
        :loading="loading"
        @click="addTask()"
        v-if="!taskToUpdate"
      >
        <v-icon small class="mr-1">mdi-plus-circle</v-icon>
        Add New Task
      </v-btn>

      <v-btn
        class="text-capitalize"
        color="blue darken-3"
        text
        small
        :loading="loading"
        @click="updateTask()"
        v-else
      >
        <v-icon small class="mr-1">mdi-update</v-icon>
        Update Task
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn
        class="text-capitalize"
        color="red darken-3"
        text
        small
        @click="resetForm()"
      >
        <v-icon small class="mr-1">mdi-trash-can-outline</v-icon>
        Clear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      valid: false,
      taskRules: {
        name: [
          v => !!v || "Name is required",
          v => (v && v.length >= 4) || "Title must be more than 3 characters"
        ],
        start_at: [v => !!v || "Start at is required"],
        end_at: [v => !!v || "End at is required"]
      },
      loading: false,
      menu2: false
    };
  },
  computed: {
    task() {
      return !this.taskToUpdate ? this.$store.state.task : this.taskToUpdate;
    },
    taskToUpdate() {
      return this.$store.state.taskToUpdate;
    },
    todayDate() {
      return this.$store.state.todayDate;
    }
  },
  methods: {
    resetForm() {
      if (!this.taskToUpdate) {
        this.$store.state.task = {
          id: null,
          name: null,
          description: null,
          start_at: null,
          end_at: null,
          task_day: this.todayDate,
          user_id: null
        };
        this.$refs.form.resetValidation();
      } else {
        this.$store.state.taskToUpdate = null;
        this.$refs.form.resetValidation();
      }
    },
    addTask() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("addTaskAction", this.task)
          .then(() => {})
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false;
            this.resetForm();
          });
      }
    },
    updateTask() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("updateTaskAction", this.task)
          .then(() => {})
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false;
            this.resetForm();
          });
      }
    }
  }
};
</script>

<style></style>
