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
                  v-model="task.day"
                  label="Task Day"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="task.day"
                @input="menu2 = false"
                :min="task.day"
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
        color="purple darken-3"
        text
        small
        :loading="loading"
        @click="addTask()"
      >
        <v-icon small class="mr-1">mdi-plus-circle</v-icon>
        Add Task
      </v-btn>

      <v-spacer></v-spacer>
      <v-btn color="red darken-3" text small @click="resetForm()">
        <v-icon small class="mr-1">mdi-trash-can-outline</v-icon>
        Clear
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
const today = new Date().toISOString().substr(0, 10);
export default {
  name: "AddTask",
  data() {
    return {
      valid: false,
      task: {
        name: null,
        description: null,
        start_at: null,
        end_at: null,
        day: today
      },
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
  methods: {
    resetForm() {
      this.$refs.form.reset();
      this.task.day = today;
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
    }
  }
};
</script>

<style></style>
