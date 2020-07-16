<template>
  <div class="row">
    <div class="col-md-6 mx-auto">
      <h2 class="display-4 text-center my-5">Register Form</h2>

      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            v-model="name"
            class="form-control"
            :class="{ 'is-invalid': errors && errors.name }"
          />
          <div v-if="errors && errors.name" class="invalid-feedback">
            {{ errors.name[0] }}
          </div>
        </div>

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
          <button type="submit" class="btn btn-primary btn-block">
            Register
          </button>
        </div>
      </form>

      <div>
        <circle-spin v-show="isLoading"></circle-spin>
      </div>
    </div>
  </div>
</template>

<script>
const endpoint = "http://authsysapi.test/api/auth/register";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: null,
      isLoading: false
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      this.$store
        .dispatch("registerAction", {
          endpoint,
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push("/profile");
        })
        .catch(err => {
          this.errors = err.response.data.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>
