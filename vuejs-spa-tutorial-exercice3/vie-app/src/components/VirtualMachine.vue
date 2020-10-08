<template>
  <div class="card bg-light">
    <div class="card-header">
      <div class="form-inline">
        <label>VM</label>
        <button class="btn x-square-fill ml-auto" type="button"></button>
      </div>
    </div>
    <div class="card-body">
      <div class="form-row">
        <label for="inputNewParameter">New Parameter</label>
        <select class="form-control" id="inputNewParameter">
          <option>NO_VALUE</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualMachine",
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
