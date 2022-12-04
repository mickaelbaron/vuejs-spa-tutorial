<script setup>
import { computed } from 'vue'

const props = defineProps({
  elementName: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update-element-value', 'remove-element'])

function removeElement() {
  emit('remove-element', props.element)
}

const elementValue = computed({
  get() {
    return props.value
  },
  set(pValue) {
    emit('update-element-value', {
      element: props.element,
      value: pValue
    })
  }
})
</script>

<template>
  <div class="form-group mb-2">
    <label class="form-label" for="inputName">{{ elementName }}</label>
    <div class="input-group">
      <input
        v-model="elementValue"
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
