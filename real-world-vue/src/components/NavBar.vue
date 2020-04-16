<template>
  <div id="nav" class="nav">
    <router-link to="/" class="brand">Real World Vue</router-link>
    <nav>
      <router-link class="nav-item" :to="{name:'event-list'}">Event List</router-link>
      <router-link class="nav-item" :to="{name:'event-create'}">Create Event</router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .brand {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: blueviolet;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: blueviolet;
  border-bottom: solid 2px blueviolet;
}
</style>