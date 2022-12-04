import { reactive, computed, readonly } from 'vue'

class HardwareSpecification {
  constructor() {
    this.memory = null
    this.core = null
    this.socket = null
    this.diskSize = null
  }
}

class Credentials {
  constructor() {
    this.login = null
    this.password = null
    this.sshKey = null
  }
}

class Network {
  constructor() {
    this.publicNet = null
    this.privateNet = null
  }
}

const MAX_VM = 20
const MIN_VM = 1

const system = reactive({
  debug: false
})

const state = reactive({
  name: '',
  description: '',
  templateId: '',
  hostname: '',
  commonCredentials: new Credentials(),
  commonHardware: new HardwareSpecification(),
  vms: [
    {
      credentials: new Credentials(),
      hardware: new HardwareSpecification(),
      network: new Network()
    }
  ],
  vmsLength: computed(() => {
    return state.vms.length
  })
})

const methods = {
  setState(newState) {
    if (system.debug) console.log('setState triggered with', newState)

    state.name = newState.name
    state.description = newState.description
    state.templateId = newState.templateId
    state.hostname = newState.hostname
    state.commonCredentials = newState.commonCredentials
    state.commonHardware = newState.commonHardware
    state.vms = newState.vms
  },

  setName(newValue) {
    if (system.debug) console.log('setMessage triggered with', newValue)

    state.name = newValue
  },

  setDescription(newValue) {
    if (system.debug) console.log('setDescription triggered with', newValue)

    state.description = newValue
  },

  setTemplateId(newValue) {
    if (system.debug) console.log('setTemplateId triggered with', newValue)

    state.templateId = newValue
  },

  setHostname(newValue) {
    if (system.debug) console.log('setHostname triggered with', newValue)

    state.hostname = newValue
  },

  setMemory(newValue) {
    if (system.debug) console.log('setMemory triggered with', newValue)

    state.commonHardware.memory = newValue
  },

  setDiskSize(newValue) {
    if (system.debug) console.log('setDiskSize triggered with', newValue)

    state.commonHardware.diskSize = newValue
  },

  setCore(newValue) {
    if (system.debug) console.log('setCore triggered with', newValue)

    state.commonHardware.core = newValue
  },

  setSocket(newValue) {
    if (system.debug) console.log('setSocket triggered with', newValue)

    state.commonHardware.socket = newValue
  },

  setLogin(newValue) {
    if (system.debug) console.log('setLogin triggered with', newValue)

    state.commonCredentials.login = newValue
  },

  setPassword(newValue) {
    if (system.debug) console.log('setPassword triggered with', newValue)

    state.commonCredentials.password = newValue
  },

  setSSHKey(newValue) {
    if (system.debug) console.log('setSSHKey triggered with', newValue)

    state.commonCredentials.sshKey = newValue
  },

  setVMElement(pVmIndex, pCategory, pElement, pElementValue) {
    if (system.debug)
      console.log(
        'setVMElement triggered with',
        pVmIndex,
        pCategory,
        pElement,
        pElementValue
      )

    state.vms[pVmIndex][pCategory][pElement] = pElementValue
  },

  initializeVMElement(pVmIndex, pCategory, pElement) {
    if (system.debug)
      console.log('setVMElement triggered with', pVmIndex, pCategory, pElement)

    state.vms[pVmIndex][pCategory][pElement] = ''
  },

  removeVMElement(pVmIndex, pCategory, pElement) {
    if (system.debug)
      console.log(
        'removeVMElement triggered with',
        pVmIndex,
        pCategory,
        pElement
      )

    state.vms[pVmIndex][pCategory][pElement] = null
  },

  getVMAvailableElements(pVmIndex) {
    let newAttributes = []

    const currentVM = state.vms[pVmIndex]
    Object.keys(currentVM).forEach((currentCategory) => {
      let newArray = Object.keys(currentVM[currentCategory])
        .filter((element) => currentVM[currentCategory][element] === null)
        .map((element) => {
          return { category: currentCategory, element: element }
        })
      newAttributes = [...newAttributes, ...newArray]
    })
    return newAttributes
  },

  getVMElement(pVmIndex, available = true) {
    let newAttributes = []

    const currentVM = state.vms[pVmIndex]
    Object.keys(currentVM).forEach((currentCategory) => {
      let newArray = Object.keys(currentVM[currentCategory])
        .filter((element) => {
          let value = currentVM[currentCategory][element]
          if (available) {
            return value === null
          } else {
            return value !== null
          }
        })
        .map((element) => {
          return {
            category: currentCategory,
            element: element,
            value: currentVM[currentCategory][element]
          }
        })
      newAttributes = [...newAttributes, ...newArray]
    })
    return newAttributes
  },

  removeVM(pValue) {
    if (system.debug) console.log('removeVM triggered with', pValue)

    if (state.vms.length > 1) {
      state.vms = state.vms
        .slice(0, pValue)
        .concat(state.vms.slice(pValue + 1, state.vms.length))
    }
  },

  setVMSLength(pValue) {
    if (system.debug) console.log('setVMSLength triggered with', pValue)
    // Compute the vmsLength value.
    let newValue = parseInt(pValue)

    if (isNaN(newValue)) {
      newValue = MIN_VM
    }

    if (newValue <= 0) {
      newValue = MIN_VM
    }

    if (newValue > MAX_VM) {
      newValue = MAX_VM
    }

    // Compute the size of vms array.
    let newElement = newValue - state.vms.length
    if (newElement > 0) {
      let current = 0
      for (current = 0; current < newElement; current++) {
        state.vms.push({
          credentials: new Credentials(),
          hardware: new HardwareSpecification(),
          network: new Network()
        })
      }
    }
  }
}

export default {
  state: readonly(state),
  system,
  methods
}
