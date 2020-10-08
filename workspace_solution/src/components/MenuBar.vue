<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
    <span class="navbar-brand">VIE-UI</span>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-bind:class="{active: isActiveRoute('Common')}">
          <a class="nav-link" href="#" @click="changeRoute('Common')">Home</a>
        </li>
        <li class="nav-item" v-bind:class="{active: isActiveRoute('Import')}">
          <a class="nav-link" href="#" @click="changeRoute('Import')">Import</a>
        </li>
        <li class="nav-item" v-bind:class="{active: isActiveRoute('Export')}">
          <a class="nav-link" href="#" @click="changeRoute('Export')">Export</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuBar",
  methods: {
    isActiveRoute(value) {
      return this.$route.name === value;
    },
    changeRoute(value) {
      this.$router.push({
        name: value,
      });
    },
  },
};
</script>