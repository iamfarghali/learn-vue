<template>
  <div class="row mt-5">
    <div class="col-md-6 mx-auto">
      <div class="card mt-5">
        <div class="card-header">
          {{ user.name }}
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">{{ user.email }}</li>
          <li class="list-group-item">{{ user.created_at }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.get_user;
    }
  }
};
</script>
