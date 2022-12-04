<script setup>
import { ref, inject } from 'vue'

const content = ref('')
const store = inject('STORE')

function importJSON() {
  store.methods.setState(JSON.parse(content.value))
}
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="card mt-3">
        <div class="card-header">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputNumberOfVM">Import</label>
            </div>
            <div class="col-md-3">
              <button
                class="btn btn-outline-primary"
                type="button"
                @click="importJSON"
              >
                JSON
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <textarea
            id="inputInport"
            v-model="content"
            class="form-control"
            rows="25"
          ></textarea>
        </div>
      </div>
    </div>
  </main>
</template>
