<script setup></script>

<template>
  <main>
    <div class="container-fluid">
      <div class="card mt-3">
        <div class="card-header">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputNumberOfVM">Export</label>
            </div>
            <div class="col-auto">
              <button class="btn btn-outline-primary">JSON</button>
              <button
                class="btn btn-outline-primary ms-2"
                disabled
                type="button"
              >
                VIE
              </button>
              <button
                class="btn btn-outline-primary ms-2"
                disabled
                type="button"
              >
                XCP-NG
              </button>
              <button
                class="btn btn-outline-primary ms-2"
                disabled
                type="button"
              >
                PROXMOX
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
