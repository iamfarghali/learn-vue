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
              dense=""
              label="Title"
              v-model="task.title"
              required
            ></v-text-field>

            <v-text-field
              dense
              label="Description"
              v-model="task.description"
              :rules="[v => !!v || 'Description is required']"
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
                :min="today"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              label="Start At"
              v-model="task.start_at"
              type="time"
            ></v-text-field>
            <v-text-field
              label="End At"
              v-model="task.end_at"
              type="time"
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
      <v-btn
        color="red darken-3"
        text
        small
        :loading="loading"
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
      task: {
        title: null,
        description: null,
        duration: null,
        start_at: null,
        end_at: null,
        day: null
      },
      loading: false,
      menu2: false
    };
  },
  computed: {
    today() {
      return new Date().toISOString().substr(0, 10);
    }
  },
  methods: {
    resetForm() {
      for (let prop in this.task) {
        this.task[prop] = null;
      }
    },
    addTask() {
      if (this.$refs.form.validate()) {
        console.log(this.task);
      }
      this.resetForm();
    }
  }
};
</script>

<style></style>
