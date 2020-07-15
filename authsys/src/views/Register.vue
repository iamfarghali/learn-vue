<template>
  <div class="row">
    <div class="col-md-6 mx-auto">
      <h2 class="display-4 text-center my-5">Register Form</h2>

      <form action="#">
        <div class="form-group">
          <label for="name">Email</label>
          <input type="text" name="name" id="name" v-model="name" class="form-control" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model="email" class="form-control" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="form-control"
          />
          <div style="color:red;" v-if="error">{{ error }}</div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-warning btn-block" @click.prevent="login">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      console.log("register");
      this.$router.push("/profile");
    }
  }
};
</script>
