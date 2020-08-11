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
        @click="login()"
      >
        <v-icon small class="mr-1">mdi-login</v-icon>
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      valid: false,
      userRules: {
        email: [
          v => !!v || "E-mail is required",
          v => /.+@.+\..+/.test(v) || "E-mail must be valid"
        ],
        password: [v => !!v || "Password is required"]
      },
      loading: false
    };
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.$store
          .dispatch("loginAction", this.user)
          .then(() => {})
          .catch(err => console.log(err))
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>

<style></style>
