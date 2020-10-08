class HardwareSpecification {
    constructor() {
        this.memory = null;
        this.core = null;
        this.socket = null;
        this.diskSize = null;
    }
}

class Credentials {
    constructor() {
        this.login = null;
        this.password = null;
        this.sshKey = null;
    }
}

class Network {
    constructor() {
        this.publicNet = null;
        this.privateNet = null;
    }
}

const MAX_VM = 20
const MIN_VM = 1

export const store = {
    debug: true,
    state: {
        name: '',
        description: '',
        templateId: '',
        hostname: '',
        commonCredentials: new Credentials(),
        commonHardware: new HardwareSpecification(),
        vms: [{ credentials: new Credentials(), hardware: new HardwareSpecification(), network: new Network() }],
        vmsLength: 1
    },

    setState(newState) {
        if (this.debug) console.log('setState triggered with', newState)

        this.state = newState
    },

    setNameAction(newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue)

        this.state.name = newValue
    },

    setTemplateIdAction(newValue) {
        if (this.debug) console.log('setTemplateIdAction triggered with', newValue)

        this.state.templateId = newValue
    },

    setDescriptionAction(newValue) {
        if (this.debug) console.log('setDescriptionAction triggered with', newValue)

        this.state.description = newValue
    },

    setHostnameAction(newValue) {
        if (this.debug) console.log('setHostnameAction triggered with', newValue)

        this.state.hostname = newValue
    },

    setMemoryAction(newValue) {
        if (this.debug) console.log('setMemoryAction triggered with', newValue)

        this.state.commonHardware.memory = newValue
    },

    setDiskSizeAction(newValue) {
        if (this.debug) console.log('setDiskSizeAction triggered with', newValue)

        this.state.commonHardware.diskSize = newValue
    },

    setCoreAction(newValue) {
        if (this.debug) console.log('setCoreAction triggered with', newValue)

        this.state.commonHardware.core = newValue
    },

    setSocketAction(newValue) {
        if (this.debug) console.log('setSocketAction triggered with', newValue)

        this.state.commonHardware.socket = newValue
    },

    setLoginAction(newValue) {
        if (this.debug) console.log('setLoginAction triggered with', newValue)

        this.state.commonCredentials["login"] = newValue
    },

    setPasswordAction(newValue) {
        if (this.debug) console.log('setPasswordAction triggered with', newValue)

        this.state.commonCredentials["password"] = newValue
    },

    setSSHKeyAction(newValue) {
        if (this.debug) console.log('setSSHKeyAction triggered with', newValue)

        this.state.commonCredentials["sshKey"] = newValue
    },

    setVMElement(pVmIndex, pCategory, pElement, pElementValue) {
        if (this.debug) console.log('setVMElement triggered with', pVmIndex, pCategory, pElement, pElementValue)

        this.state.vms[pVmIndex][pCategory][pElement] = pElementValue
    },

    initializeVMElement(pVmIndex, pCategory, pElement) {
        if (this.debug) console.log('setVMElement triggered with', pVmIndex, pCategory, pElement)

        this.state.vms[pVmIndex][pCategory][pElement] = ""
    },
   
    removeVMElement(pVmIndex, pCategory, pElement) {
        if (this.debug) console.log('removeVMElement triggered with', pVmIndex, pCategory, pElement)

        this.state.vms[pVmIndex][pCategory][pElement] = null
    },

    getVMAvailableElements(pVmIndex) {
        let newAttributes = [];

        const currentVM = this.state.vms[pVmIndex];
        Object.keys(currentVM).forEach(currentCategory => {
            let newArray = Object.keys(currentVM[currentCategory]).filter(element => currentVM[currentCategory][element] === null).map(element => {
                return { category: currentCategory, element: element }
            }
            );
            newAttributes = [...newAttributes, ...newArray];
        });
        return newAttributes;
    },

    getVMElement(pVmIndex, available = true) {
        let newAttributes = [];

        const currentVM = this.state.vms[pVmIndex];
        Object.keys(currentVM).forEach(currentCategory => {
            let newArray = Object.keys(currentVM[currentCategory]).filter(element => {
                let value = currentVM[currentCategory][element];
                if (available) {
                    return value === null
                } else {
                    return value !== null
                }
            }).map(element => {
                return { category: currentCategory, element: element, value: currentVM[currentCategory][element] }
            }
            );
            newAttributes = [...newAttributes, ...newArray];
        });
        return newAttributes;
    },

    removeVM(pValue) {
        if (this.debug) console.log('removeVM triggered with', pValue)

        if (this.state.vms.length > 1 && this.state.vmsLength > 1) {
            this.state.vms = this.state.vms.slice(0, pValue).concat(this.state.vms.slice(pValue + 1, this.state.vms.length));
            this.state.vmsLength--;
        }
    },

    setVMSLength(pValue) {
        if (this.debug) console.log('setVMSLength triggered with', pValue)
        // Compute the vmsLength value.
        let newValue = parseInt(pValue);

        if (isNaN(newValue)) {
            newValue = MIN_VM
        }

        if (newValue <= 0) {
            newValue = MIN_VM
        }

        if (newValue > MAX_VM) {
            newValue = MAX_VM
        }
        this.state.vmsLength = newValue;

        // Compute the size of vms array.
        let newElement = this.state.vmsLength - this.state.vms.length;
        if (newElement > 0) {
            let current = 0;
            for (current = 0; current < newElement; current++) {
                this.state.vms.push({ credentials: new Credentials(), hardware: new HardwareSpecification(), network: new Network() });
            }
        }
    }
}
