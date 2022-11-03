<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</router-link>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link class="nav-link" :to="{ name: 'contactbook' }">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div class="mr-right navbar-nav" v-if="!logged">
      <router-link
        to="/login"
        class="btn btn-primary btn-lg active mr-2"
        role="button"
        aria-pressed="true"
        >Đăng nhập</router-link
      >
      <router-link
        to="/register"
        class="btn btn-secondary btn-lg active"
        role="button"
        aria-pressed="true"
        >Đăng ký</router-link
      >
    </div>
    <div v-else>
      <button class="btn btn-danger btn-lg active" @click="updateStatus">Đăng xuất</button>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    logged() {
      return this.$store.state.logged;
    },
  },
  methods: {
    updateStatus() {
      this.$store.commit('updateStatus');
    },
  },
};
</script>
