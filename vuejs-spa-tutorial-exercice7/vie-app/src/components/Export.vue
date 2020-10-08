<template>
  <div class="row">
    <div class="col mt-3">
      <div class="card">
        <div class="card-header">
          <form class="form-inline">
            <div class="form-group mb-2">
              <label for="inputExport">Export</label>
            </div>
            <div class="form-group ml-2 mb-2">
              <button class="btn btn-outline-primary" disabled type="button">VIE</button>
            </div>
            <div class="form-group ml-2 mb-2">
              <button class="btn btn-outline-primary" @click="exportJSON" type="button">JSON</button>
            </div>
          </form>
        </div>
        <div class="card-body">
          <textarea class="form-control" id="inputExport" v-model="content" rows="25"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "Export",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    exportJSON() {
      this.content = JSON.stringify(store.state, null, 10);
    },
  },
};
</script>