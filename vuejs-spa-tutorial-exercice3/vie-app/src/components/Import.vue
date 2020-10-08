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
              <button class="btn btn-outline-primary" type="button">JSON</button>
            </div>
          </form>
        </div>
        <div class="card-body">
          <textarea class="form-control" id="inputImport" rows="25"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Import",
};
</script>