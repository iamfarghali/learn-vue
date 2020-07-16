<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Logo</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNavAltMarkup"
      aria-controls="navbarNavAltMarkup"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav ml-auto">
        <router-link to="/" class="nav-item nav-link">Home</router-link>
        <router-link v-show="!loggedIn" to="/login" class="nav-item nav-link"
          >Login</router-link
        >
        <router-link v-show="!loggedIn" to="/register" class="nav-item nav-link"
          >Register</router-link
        >
        <router-link v-show="loggedIn" to="/profile" class="nav-item nav-link"
          >Profile</router-link
        >
        <a
          v-show="loggedIn"
          href="#"
          @click.prevent="logout"
          class="nav-item nav-link"
          >Logout</a
        >
      </div>
    </div>
  </nav>
</template>

<script>
const endpoint = "http://authsysapi.test/api/auth/logout";
export default {
  name: "Navbar",
  computed: {
    loggedIn() {
      return this.$store.getters.get_loggedIn;
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logoutAction", {
          endpoint
        })
        .then(() => this.$router.push("/").catch(() => {}))
        .catch(() => {});
    }
  }
};
</script>

<style></style>
