<script setup></script>

<template>
  <main>
    <div class="container-fluid">
      <div class="mt-3">
        <div class="card">
          <div class="card-header">Global configuration</div>
          <div class="card-body">
            <div class="mb-3">
              <label for="inputName" class="form-label">Name</label>
              <input id="inputName" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label for="inputDescription" class="form-label"
                >Full description</label
              >
              <textarea
                id="inputDescription"
                class="form-control"
                rows="3"
              ></textarea>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputTemplateID">Template ID</label>
                <input id="inputTemplateID" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label for="inputHostnameTemplate">Hostname template</label>
                <input
                  id="inputHostnameTemplate"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-3">
                <label class="form-label" for="inputMemory">Memory</label>
                <input id="inputMemory" type="text" class="form-control" />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputDisksize">Disk size</label>
                <input id="inputDisksize" type="text" class="form-control" />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputCore">Core</label>
                <input id="inputCore" type="text" class="form-control" />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputSocket">Socket</label>
                <input id="inputSocket" type="text" class="form-control" />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label" for="inputLogin">Login</label>
                <input id="inputLogin" type="text" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label" for="inputPassword">Password</label>
                <input id="inputPassword" type="text" class="form-control" />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label" for="inputSSHKey">SSH key</label>
                <textarea
                  id="inputSSHKey"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="card mt-3">
        <div class="card-header">
          <div class="row g-3 align-items-center">
            <div class="col-auto">
              <label for="inputNumberOfVM">Virtual Machines</label>
            </div>
            <div class="col-md-3">
              <input
                id="inputNumberOfVM"
                type="text"
                class="form-control"
                placeholder="Number of VM"
              />
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
          <!-- VirtualMachine component -->
        </div>
      </div>
    </div>
  </main>
</template>
