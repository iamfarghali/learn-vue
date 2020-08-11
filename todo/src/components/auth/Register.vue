<template>
  <v-card outlined>
    <v-card-text class="pb-0">
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
              placeholder="Jon Doe"
              type="text"
              v-model="user.name"
              :rules="userRules.name"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              placeholder="user@example.com"
              type="email"
              v-model="user.email"
              :rules="userRules.email"
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              type="password"
              v-model="user.password"
              :rules="userRules.password"
              required
            ></v-text-field>
            <v-text-field
              label="Repeat Password"
              type="password"
              v-model="user.password_confirmation"
              :rules="[passwordConfirmationRule]"
              required
            ></v-text-field>
          </v-form>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn
        class="text-capitalize"
        color="purple darken-3"
        text
        :loading="loading"
        @click="register()"
      >
        <v-icon small class="mr-1">mdi-account</v-icon>
        Register
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      userRules: {
        name: [v => !!v || "Name is required"],
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [v => !!v || "Password is required"]
      },
      valid: false,
      loading: false
    };
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.user.password === this.user.password_confirmation ||
        "Password must match";
    }
  },
  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("registerAction", this.user)
          .then(() => {})
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false;
            this.$refs.form.reset();
            this.$refs.form.resetValidation();
          });
      }
    }
  }
};
</script>

<style></style>
