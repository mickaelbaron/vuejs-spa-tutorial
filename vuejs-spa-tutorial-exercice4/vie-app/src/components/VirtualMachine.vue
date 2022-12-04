<script setup></script>

<template>
  <div class="col">
    <div class="card bg-light">
      <div class="card-header">
        <div class="row g-3 align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <label>VM</label>
            <button class="btn bi-x-square-fill ml-auto" type="button"></button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="form-row mb-3">
          <label class="form-label" for="inputNewParameter"
            >New Parameter</label
          >
          <select id="exampleFormControlSelect1" class="form-select">
            <option disabled>Memory</option>
            <option>Disk Size</option>
            <option>Core</option>
            <option>Socket</option>
          </select>
        </div>
        <!-- VirtualMachineElement component -->
      </div>
    </div>
  </div>
</template>
