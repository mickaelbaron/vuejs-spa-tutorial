<template>
  <div class="card bg-light">
    <div class="card-header">
      <div class="form-inline">
        <label>VM {{ currentIndex + 1 }}</label>
        <button class="btn x-square-fill ml-auto" type="button" @click="onRemoveVM"></button>
      </div>
    </div>
    <div class="card-body">
      <div class="form-row">
        <label for="inputNewParameter">New Parameter</label>
        <select
          @change="onChangeSelectedElement"
          class="form-control"
          id="inputNewParameter"
          v-model="selected"
        >
          <option
            v-for="(option, index) in options"
            v-bind:value="option.value"
            :key="index"
          >{{ option.text }}</option>
        </select>
      </div>
      <div v-for="(val, key) in elements" :key="key">
        <VirtualMachineElement
          :currentIndex="currentIndex"
          :category="val.category"
          :element="val.element"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import { myi18n } from "../myi18n.js";
import VirtualMachineElement from "@/components/VirtualMachineElement.vue";

const NO_VALUE = "noValue";

export default {
  name: "VirtualMachine",
  components: {
    VirtualMachineElement,
  },
  data() {
    return {
      selected: NO_VALUE,
      storeState: store.state,
      currentIndex: 0
    };
  },
  computed: {
    options: {
      get() {
        let vmelement = store.getVMElement(this.currentIndex);
        let newOptions = Object.keys(vmelement).map((current) => {
          return {
            value: this.getMergedCategoryAndElement(
              vmelement[current].category,
              vmelement[current].element
            ),
            text: this.getTranslate(vmelement[current].element),
          };
        });

        newOptions.unshift({
          value: NO_VALUE,
          text: this.getTranslate(NO_VALUE),
        });
        return newOptions;
      },
    },
    vms: {
      get() {
        return this.storeState.vms[this.currentIndex];
      },
    },
    elements: {
      get() {
        let values = store.getVMElement(this.currentIndex, false);
        return values;
      },
    },
  },
  methods: {
    onRemoveVM() {
      store.removeVM(this.currentIndex);
    },

    getCategoryAndElementObject(categoryElement) {
      const categoryAndElementValue = categoryElement.split("-");

      return {
        category: categoryAndElementValue[0],
        element: categoryAndElementValue[1],
      };
    },

    getMergedCategoryAndElement(category, element) {
      return category + "-" + element;
    },

    getTranslate(value) {
      return myi18n.getTranslate(value);
    },

    onChangeSelectedElement(event) {
      const currentValue = event.target.value;

      const categoryAndElementValue = this.getCategoryAndElementObject(
        currentValue
      );

      store.initializeVMElement(
        this.currentIndex,
        categoryAndElementValue.category,
        categoryAndElementValue.element
      );
      this.selected = NO_VALUE;
    },

    onRemoveElement(currentValue) {
      const categoryAndElementValue = this.getCategoryAndElementObject(
        currentValue
      );

      store.setVMElement(
        this.currentIndex,
        categoryAndElementValue.category,
        categoryAndElementValue.element,
        null
      );
    },

    onUpdateElementValue(payload) {
      const categoryAndElementValue = this.getCategoryAndElementObject(
        payload.element
      );
      store.setVMElement(
        this.currentIndex,
        categoryAndElementValue.category,
        categoryAndElementValue.element,
        payload.value
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.x-square-fill:before {
  content: url("data:image/svg+xml,<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-x-square-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z'/></svg>");
  width: 5px;
  float: center;
  margin-right: 0px;
  margin-top: 0px;
}
</style>
