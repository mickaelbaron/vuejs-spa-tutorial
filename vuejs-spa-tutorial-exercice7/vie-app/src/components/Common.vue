<template>
  <div>
    <div class="row">
      <div class="col mt-3">
        <div class="card">
          <div class="card-header">Global configuration</div>
          <div class="card-body">
            <div class="form-row">
              <label for="inputName">Name</label>
              <input type="text" v-model="name" class="form-control" id="inputName" />
            </div>
            <div class="form-row">
              <label for="inputDescription">Full description</label>
              <textarea class="form-control" v-model="description" id="inputDescription" rows="3"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputTemplateID">Template ID</label>
                <input type="text" v-model="templateId" class="form-control" id="inputTemplateID" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputHostnameTemplate">Hostname template</label>
                <input
                  type="text"
                  v-model="hostname"
                  class="form-control"
                  id="inputHostnameTemplate"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-3">
                <label for="inputMemory">Memory</label>
                <input type="text" v-model="memory" class="form-control" id="inputMemory" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputDisksize">Disk size</label>
                <input type="text" v-model="diskSize" class="form-control" id="inputDisksize" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputCore">Core</label>
                <input type="text" v-model="core" class="form-control" id="inputCore" />
              </div>
              <div class="form-group col-md-3">
                <label for="inputSocket">Socket</label>
                <input type="text" v-model="socket" class="form-control" id="inputSocket" />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputLogin">Login</label>
                <input type="text" v-model="login" class="form-control" id="inputLogin" />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword">Password</label>
                <input type="text" v-model="password" class="form-control" id="inputPassword" />
              </div>
            </div>

            <div class="form-row">
              <label for="inputSSHKey">SSH key</label>
              <textarea class="form-control" v-model="sshKey" id="inputSSHKey" rows="3"></textarea>
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
            <input
              type="text"
              class="form-control"
              id="inputNumberOfVM"
              v-model.lazy="vmsLength"
              placeholder="Number of VM"
            />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-columns">
          <div v-for="index in vmsLength" :key="index">
            <VirtualMachine :currentIndex="index-1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";
import VirtualMachine from "@/components/VirtualMachine.vue";

export default {
  name: "Common",
  components: {
    VirtualMachine,
  },
  data() {
    return {
      storeState: store.state,
    };
  },
  computed: {
    name: {
      get() {
        return this.storeState.name;
      },
      set(value) {
        store.setNameAction(value);
      },
    },
    description: {
      get() {
        return this.storeState.description;
      },
      set(value) {
        store.setDescriptionAction(value);
      },
    },
    templateId: {
      get() {
        return this.storeState.templateId;
      },
      set(value) {
        store.setTemplateIdAction(value);
      },
    },
    hostname: {
      get() {
        return this.storeState.hostname;
      },
      set(value) {
        store.setHostnameAction(value);
      },
    },
    memory: {
      get() {
        return this.storeState.commonHardware.memory;
      },
      set(value) {
        store.setMemoryAction(value);
      },
    },
    diskSize: {
      get() {
        return this.storeState.commonHardware.diskSize;
      },
      set(value) {
        store.setDiskSizeAction(value);
      },
    },
    core: {
      get() {
        return this.storeState.commonHardware.core;
      },
      set(value) {
        store.setCoreAction(value);
      },
    },
    socket: {
      get() {
        return this.storeState.commonHardware.socket;
      },
      set(value) {
        store.setSocketAction(value);
      },
    },
    login: {
      get() {
        return this.storeState.commonCredentials["login"];
      },
      set(value) {
        store.setLoginAction(value);
      },
    },
    password: {
      get() {
        return this.storeState.commonCredentials["password"];
      },
      set(value) {
        store.setPasswordAction(value);
      },
    },
    sshKey: {
      get() {
        return this.storeState.commonCredentials["sshKey"];
      },
      set(value) {
        store.setSSHKeyAction(value);
      },
    },
    vmsLength: {
      get() {
        return this.storeState.vmsLength;
      },
      set(value) {
        store.setVMSLength(value);
        this.$forceUpdate();
      },
    },
  },
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
