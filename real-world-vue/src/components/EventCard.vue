<template>
  <router-link class="event-link" :to="{name:'event-show', params:{id:event.id}}">
    <div class="event-card -shadow">
      <span class="eyebrow">@{{event.time}} on {{event.date}}</span>
      <h4 class="title">{{event.title}}</h4>
      <BaseIcon name="users">{{event.attendees ? event.attendees.length : 0}} attending</BaseIcon>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    event: {
      type: Object
    }
  }
}
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.1s ease-in;
  border-radius: 8px;
}
.event-card:hover {
  background-color: blueviolet;
  color: whitesmoke;
  transform: scale(1.04);
  box-shadow: 0 2px 5px 0 rgba(70, 70, 70, 0.555),
    0 1px 3px 0 rgba(70, 70, 70, 0.19);
}
.event-card > .title {
  margin: 0;
}

.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>