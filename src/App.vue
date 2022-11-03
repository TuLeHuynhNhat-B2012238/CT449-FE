<template>
  <div id="app">
    <app-header></app-header>
    <div class="container mt-5">
      <router-view></router-view>
      <router-view name="login"></router-view>
      <router-view name="register"></router-view>
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
