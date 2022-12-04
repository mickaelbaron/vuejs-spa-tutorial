<script setup>
import { inject } from 'vue'

const store = inject('STORE')
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand">VIE-IE</span>
        <div id="navbarNav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item">
              <a class="nav-link" href="#">Import</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Export</a>
            </li>
          </ul>
          <div class="form-check form-switch">
            <input
              id="flexSwitchCheckDefault"
              v-model="store.system.debug"
              class="form-check-input"
              type="checkbox"
            />
            <label
              class="form-check-label text-white-50"
              for="flexSwitchCheckDefault"
              >Debug Mode</label
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
