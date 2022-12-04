<script setup>
import { computed, inject } from 'vue'

import VirtualMachine from './VirtualMachine.vue'

const store = inject('STORE')

const name = computed({
  get() {
    return store.state.name
  },
  set(newValue) {
    store.methods.setName(newValue)
  }
})

const description = computed({
  get() {
    return store.state.description
  },
  set(newValue) {
    store.methods.setDescription(newValue)
  }
})

const templateId = computed({
  get() {
    return store.state.templateId
  },
  set(newValue) {
    store.methods.setTemplateId(newValue)
  }
})

const hostname = computed({
  get() {
    return store.state.hostname
  },
  set(newValue) {
    store.methods.setHostname(newValue)
  }
})

const memory = computed({
  get() {
    return store.state.commonHardware.memory
  },
  set(newValue) {
    store.methods.setMemory(newValue)
  }
})

const diskSize = computed({
  get() {
    return store.state.commonHardware.diskSize
  },
  set(newValue) {
    store.methods.setDiskSize(newValue)
  }
})

const core = computed({
  get() {
    return store.state.commonHardware.core
  },
  set(newValue) {
    store.methods.setCore(newValue)
  }
})

const socket = computed({
  get() {
    return store.state.commonHardware.socket
  },
  set(newValue) {
    store.methods.setSocket(newValue)
  }
})

const login = computed({
  get() {
    return store.state.commonCredentials.login
  },
  set(newValue) {
    store.methods.setLogin(newValue)
  }
})

const password = computed({
  get() {
    return store.state.commonCredentials.password
  },
  set(newValue) {
    store.methods.setPassword(newValue)
  }
})

const sshKey = computed({
  get() {
    return store.state.commonCredentials.sshKey
  },
  set(newValue) {
    store.methods.setSSHKey(newValue)
  }
})

const vmsLength = computed({
  get() {
    return store.state.vmsLength
  },
  set(newValue) {
    store.methods.setVMSLength(newValue)
  }
})
</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="mt-3">
        <div class="card">
          <div class="card-header">Global configuration</div>
          <div class="card-body">
            <div class="mb-3">
              <label for="inputName" class="form-label">Name</label>
              <input
                id="inputName"
                v-model="name"
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="inputDescription" class="form-label"
                >Full description</label
              >
              <textarea
                id="inputDescription"
                v-model="description"
                class="form-control"
                rows="3"
              ></textarea>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputTemplateID">Template ID</label>
                <input
                  id="inputTemplateID"
                  v-model="templateId"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label for="inputHostnameTemplate">Hostname template</label>
                <input
                  id="inputHostnameTemplate"
                  v-model="hostname"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-3">
                <label class="form-label" for="inputMemory">Memory</label>
                <input
                  id="inputMemory"
                  v-model="memory"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputDisksize">Disk size</label>
                <input
                  id="inputDisksize"
                  v-model="diskSize"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputCore">Core</label>
                <input
                  id="inputCore"
                  v-model="core"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-3">
                <label class="form-label" for="inputSocket">Socket</label>
                <input
                  id="inputSocket"
                  v-model="socket"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label" for="inputLogin">Login</label>
                <input
                  id="inputLogin"
                  v-model="login"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label" for="inputPassword">Password</label>
                <input
                  id="inputPassword"
                  v-model="password"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-12">
                <label class="form-label" for="inputSSHKey">SSH key</label>
                <textarea
                  id="inputSSHKey"
                  v-model="sshKey"
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
                v-model.number.lazy="vmsLength"
                type="text"
                class="form-control"
                placeholder="Number of VM"
              />
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <!-- VirtualMachine component -->
            <div v-for="index in vmsLength" :key="index">
              <VirtualMachine :current-index="index - 1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
