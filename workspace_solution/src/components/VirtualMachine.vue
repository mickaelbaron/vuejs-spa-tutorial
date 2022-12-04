<script setup>
import { computed, inject, ref } from 'vue'

import { myi18n } from '../myi18n.js'
//import VirtualMachineElement from './VirtualMachineElement.vue'
import VirtualMachineElementWithCustomEvent from './VirtualMachineElementWithCustomEvent.vue'

const store = inject('STORE')
const NO_VALUE = 'noValue'
const selected = ref(NO_VALUE)

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  }
})

function onRemoveVM() {
  store.methods.removeVM(props.currentIndex)
}

function getMergedCategoryAndElement(category, element) {
  return category + '-' + element
}

function getCategoryAndElementObject(categoryElement) {
  const categoryAndElementValue = categoryElement.split('-')

  return {
    category: categoryAndElementValue[0],
    element: categoryAndElementValue[1]
  }
}

function onChangeSelectedElement(event) {
  const currentValue = event.target.value

  const categoryAndElementValue = getCategoryAndElementObject(currentValue)

  store.methods.initializeVMElement(
    props.currentIndex,
    categoryAndElementValue.category,
    categoryAndElementValue.element
  )

  selected.value = NO_VALUE
}

function getTranslate(value) {
  return myi18n.getTranslate(value)
}

function onRemoveElement(currentValue) {
  console.log(currentValue)
  const categoryAndElementValue = getCategoryAndElementObject(currentValue)

  store.methods.setVMElement(
    props.currentIndex,
    categoryAndElementValue.category,
    categoryAndElementValue.element,
    null
  )
}

function onUpdateElementValue(payload) {
  console.log(payload)
  const categoryAndElementValue = getCategoryAndElementObject(payload.element)
  store.methods.setVMElement(
    props.currentIndex,
    categoryAndElementValue.category,
    categoryAndElementValue.element,
    payload.value
  )
}

const options = computed({
  get() {
    let vmelement = store.methods.getVMElement(props.currentIndex)
    let newOptions = Object.keys(vmelement).map((current) => {
      return {
        value: getMergedCategoryAndElement(
          vmelement[current].category,
          vmelement[current].element
        ),
        text: getTranslate(vmelement[current].element)
      }
    })

    newOptions.unshift({
      value: NO_VALUE,
      text: getTranslate(NO_VALUE)
    })

    return newOptions
  }
})

const elements = computed({
  get() {
    let values = store.methods.getVMElement(props.currentIndex, false)
    return values
  }
})
</script>

<template>
  <div class="col">
    <div class="card bg-light">
      <div class="card-header">
        <div class="row g-3 align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <label>VM {{ currentIndex + 1 }}</label>
            <button
              class="btn bi-x-square-fill ml-auto"
              type="button"
              @click="onRemoveVM"
            ></button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="form-row mb-3">
          <label class="form-label" for="inputNewParameter"
            >New Parameter</label
          >
          <select
            id="inputNewParameter"
            v-model="selected"
            class="form-control"
            @change="onChangeSelectedElement"
          >
            <option
              v-for="(option, index) in options"
              :key="index"
              :value="option.value"
            >
              {{ option.text }}
            </option>
          </select>
        </div>
        <div v-for="(val, key) in elements" :key="key">
          <!-- <VirtualMachineElement
            :current-index="currentIndex"
            :category="val.category"
            :element="val.element"
          /> -->
          <VirtualMachineElementWithCustomEvent
            :element-name="getTranslate(val.element)"
            :element="getMergedCategoryAndElement(val.category, val.element)"
            :value="val.value"
            @update-element-value="onUpdateElementValue"
            @remove-element="onRemoveElement"
          />
        </div>
      </div>
    </div>
  </div>
</template>
