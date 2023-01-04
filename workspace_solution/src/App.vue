<script setup>
import { provide } from 'vue'
// Import RouterView component
import { RouterView } from 'vue-router'

import MenuBar from './components/MenuBar.vue'
import Footer from './components/Footer.vue'

import store from './store.js'

provide('STORE', store)
</script>

<template>
  <div class="container-fluid">
    <MenuBar />
    <!-- Add RouterView component -->
    <RouterView />
    <Footer />
  </div>
</template>
