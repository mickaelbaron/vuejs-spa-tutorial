<script setup>
import { provide } from 'vue'

import MenuBar from './components/MenuBar.vue'
import Global from './components/Global.vue'
import Footer from './components/Footer.vue'

import store from './store.js'

provide('STORE', store)
</script>

<template>
  <div class="container-fluid">
    <MenuBar />
    <Global />
    <Footer />
  </div>
</template>
