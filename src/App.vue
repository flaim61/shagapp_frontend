<template>
  <Header/>
  <RouterView />
  <Footer/>
</template>

<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import Header from "./components/includes/Header.vue";
  import Footer from "./components/includes/Footer.vue";
</script>

<style scoped>

</style>
