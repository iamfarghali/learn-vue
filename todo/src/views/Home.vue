<template>
  <div>
    <v-row v-if="isUserLoggedIn" class="my-16" justify="space-between">
      <v-col
        cols="10"
        offset="1"
        sm="8"
        offset-sm="2"
        md="7"
        offset-md="0"
        lg="8"
        offset-lg="0"
      >
        <tasks />
      </v-col>
      <v-col
        cols="10"
        offset="1"
        sm="8"
        offset-sm="2"
        md="5"
        offset-md="0"
        lg="4"
        offset-lg="0"
      >
        <add-task></add-task>
      </v-col>
    </v-row>
    <v-row v-else class="mt-16">
      <v-col cols="4" offset="4" class="mb-n7 text-center">
        <v-card outlined>
          <v-btn
            class="ma-2"
            @click="showRegister()"
            text
            small
            :class="{
              'black--text': !isShowRegister,
              'purple--text text--darken-3': isShowRegister
            }"
            >Register</v-btn
          >
          <v-btn
            class="ma-2"
            @click="showLogin()"
            text
            small
            :class="{
              'black--text': !isShowLogin,
              'purple--text text--darken-3': isShowLogin
            }"
            >Login</v-btn
          >
        </v-card>
      </v-col>
      <v-col cols="4" offset="4">
        <login v-show="isShowLogin || letsLogin"></login>
        <register v-show="isShowRegister && !letsLogin"></register>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Tasks from "@/components/tasks/Tasks";
import AddTask from "@/components/tasks/AddTask";
import Register from "@/components/auth/Register";
import Login from "@/components/auth/Login";

export default {
  name: "Home",
  data() {
    return {
      isShowLogin: true,
      isShowRegister: false
    };
  },
  components: {
    Register,
    Login,
    Tasks,
    AddTask
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    letsLogin() {
      return this.$store.state.letsLogin;
    }
  },
  methods: {
    showRegister() {
      this.isShowLogin = false;
      this.isShowRegister = true;
      if (this.letsLogin) {
        this.$store.state.letsLogin = false;
      }
    },
    showLogin() {
      this.isShowRegister = false;
      this.isShowLogin = true;
    }
  }
};
</script>
