<script setup></script>

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
              <button class="btn btn-outline-primary" type="button">
                JSON
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <textarea id="inputInport" class="form-control" rows="25"></textarea>
        </div>
      </div>
    </div>
  </main>
</template>
