<template>
  <div class="container-fluid" id="app">
    <menuBar />
    <common />
  </div>
</template>

<script>
import menuBar from "@/components/MenuBar.vue";
import common from "@/components/Common.vue";

export default {
  name: "App",
  components: { menuBar, common },
};
</script>

<style>
</style>