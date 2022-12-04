<script setup>
import { computed, inject } from 'vue'

import { myi18n } from '../myi18n.js'

const store = inject('STORE')

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  }
})

function removeElement() {
  store.methods.removeVMElement(
    props.currentIndex,
    props.category,
    props.element
  )
}

function getTranslate(value) {
  return myi18n.getTranslate(value)
}

const attribut = computed({
  get() {
    return store.state.vms[props.currentIndex][props.category][props.element]
  },
  set(pValue) {
    store.methods.setVMElement(
      props.currentIndex,
      props.category,
      props.element,
      pValue
    )
  }
})
</script>

<template>
  <div class="form-group mb-2">
    <label class="form-label" for="inputName">{{
      getTranslate(element)
    }}</label>
    <div class="input-group">
      <input
        v-model="attribut"
        type="text"
        class="form-control"
        placeholder=""
      />
      <div class="input-group-prepend">
        <button
          class="btn bi-trash-fill"
          type="button"
          @click="removeElement"
        ></button>
      </div>
    </div>
  </div>
</template>
