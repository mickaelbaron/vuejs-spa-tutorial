<template>
  <div>
    <div class="row">
      <div class="col mt-3">
        <div class="card">
          <div class="card-header">Global configuration</div>
          <div class="card-body">
            <div class="form-row">
              <label for="inputName">Name</label>
              <input type="text" class="form-control" id="inputName" />
            </div>
            <div class="form-row">
              <label for="inputDescription">Full description</label>
              <textarea class="form-control" id="inputDescription" rows="3"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTemplateID">Template ID</label>
                <input type="text" class="form-control" id="inputTemplateID" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputHostnameTemplate">Hostname template</label>
                <input type="text" class="form-control" id="inputHostnameTemplate" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-3">
                <label for="inputMemory">Memory</label>
                <input type="text" class="form-control" id="inputMemory" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputDisksize">Disk size</label>
                <input type="text" class="form-control" id="inputDisksize" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputCore">Core</label>
                <input type="text" class="form-control" id="inputCore" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputSocket">Socket</label>
                <input type="text" class="form-control" id="inputSocket" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputLogin">Login</label>
                <input type="text" class="form-control" id="inputLogin" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword">Password</label>
                <input type="text" class="form-control" id="inputPassword" />
              </div>
            </div>

            <div class="form-row">
              <label for="inputSSHKey">SSH key</label>
              <textarea class="form-control" id="inputSSHKey" rows="3"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        <div class="form-inline">
          <div class="form-group">
            <label for="inputNumberOfVM">Virtual Machines</label>
          </div>
          <div class="form-group mx-2">
            <input type="text" class="form-control" id="inputNumberOfVM" placeholder="Number of VM" />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-columns"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Common",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (min-width: 576px) {
  .card-columns {
    column-count: 1;
  }
}
@media (min-width: 700px) {
  .card-columns {
    column-count: 2;
  }
}
@media (min-width: 1200px) {
  .card-columns {
    column-count: 3;
  }
}
@media (min-width: 1600px) {
  .card-columns {
    column-count: 4;
  }
}
</style>
