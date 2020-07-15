<template>
  <div class="row">
    <div class="col-md-6 mx-auto">
      <h2 class="display-4 text-center my-5">Login Form</h2>

      <div
        v-if="errors && errors.unauthorized"
        class="alert alert-danger text-center"
      >
        {{ errors.unauthorized }}
      </div>

      <form action="#">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            v-model="email"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.email }"
          />
          <div v-if="errors && errors.email" class="invalid-feedback">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.password }"
          />
          <div v-if="errors && errors.password" class="invalid-feedback">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="form-group">
          <button
            type="submit"
            class="btn btn-primary btn-block"
            @click.prevent="login"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const endpoint = "http://authsysapi.test/api/auth/login";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: null
    };
  },
  methods: {
    login() {
      axios
        .post(endpoint, {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.data.access_token);
          localStorage.setItem("user", data.data.user);
          this.$router.push("/profile");
        })
        .catch(err => {
          this.errors = err.response.data.message;
        })
        .finally(() => {
          this.password = "";
        });
    }
  }
};
</script>
