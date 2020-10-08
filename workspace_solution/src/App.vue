<template>
  <div class="container-fluid" id="app">
    <menuBar />
    <router-view />
  </div>
</template>

<script>
import menuBar from "@/components/MenuBar.vue";

export default {
  name: "App",
  components: { menuBar },
};
</script>

<style>
</style>
