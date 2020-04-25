<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Event List</router-link> |
      <router-link to="/event-create">Create New Event</router-link>
      <router-link to="/event-show/1">Event One</router-link>
    </div>
    <router-view />
  </div>
</template>

<style></style>
