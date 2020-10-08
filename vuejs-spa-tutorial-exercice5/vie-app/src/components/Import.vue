<template>
  <div class="row">
    <div class="col mt-3">
      <div class="card">
        <div class="card-header">
          <form class="form-inline">
            <div class="form-group mb-2">
              <label for="inputImport">Import</label>
            </div>
            <div class="form-group ml-2 mb-2">
              <button class="btn btn-outline-primary" @click="importJSON" type="button">JSON</button>
            </div>
          </form>
        </div>
        <div class="card-body">
          <textarea v-model="content" class="form-control" id="inputImport" rows="25"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "Import",
  data() {
    return {
      content: "",
    };
  },
  methods: {
    importJSON() {
      store.setState(JSON.parse(this.content));
    },
  },
};
</script>