<template>
  <div class="form-group">
    <label for="inputName">{{ elementName }}</label>
    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        placeholder
        v-model="elementValue"
        aria-label="Example text with button addon"
        aria-describedby="button-addon1"
      />
      <div class="input-group-prepend">
        <button @click="removeElement" class="btn trash-fill" type="button"></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualMachineElement",
  props: {
    elementName: {
      type: String,
      required: true,
    },
    element: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    elementValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update-element-value", {
          element: this.element,
          value: value,
        });
      },
    },
  },
  methods: {
    removeElement() {
      this.$emit("remove-element", this.element);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.trash-fill:before {
  content: url("data:image/svg+xml,<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash-fill' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z'/></svg>");
  width: 5px;
  float: center;
  margin-right: 0px;
  margin-top: 0px;
}
</style>
