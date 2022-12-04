# Exercice 5 : savoir communiquer avec le gestionnaire d'état 

Dans ce cinquième exercice, nous commencerons à faire communiquer les composants entre eux. La première technique étudiée sera le gestionnaire d'état qui permet de fournir un modèle transverse à tous les composants.

Pour la mise en place du gestionnaire d'état de type *Do It Yourself*, nous avons suivi les préconisations proposées [ici](https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api). Nous n'utiliserons pas de bibliothèque spécifique telle que [Pinia](https://pinia.vuejs.org/). L'idée étant de maîtriser ce patron de conception avant l'utilisation d'implémentation prête à l'emploi comme [Pinia](https://pinia.vuejs.org/).

La solution de l'exercice 4 est disponible dans le répertoire _vuejs-spa-tutorial-exercice5/vie-app_.

## But

* Développer le patron de conception gestionnaire d'état.
* Utiliser des propriétés calculées.
* Réaliser des liaisons bidirectionnelles (modèle/vue) avec des propriétés calculées via des accesseurs (get) et des mutateurs (set).
* Contrôler le contenu du gestionnaire d'état via l'outil **Vue-DevTools**.

## Étapes à suivre

Nous allons supprimer le code ajouté à la fin de l'exercice 4 (tout ce qui concerne l'utilisation de la propriété `vmsLengthTemp`) avant d'ajouter la liaison avec le gestionnaire d'état.

* Éditer le fichier _Common.vue_ et supprimer tout le code qui a été ajouté pour gérer la propriété `vmsLengthTemp`. Ci-dessous est listé le code qui doit être supprimé.

```html
import { ref } from 'vue'
const vmsLengthTemp = ref('1')

v-model.number.lazy="vmsLengthTemp"
<div v-for="index in vmsLengthTemp" :key="index">
  <VirtualMachine />
</div>
```

* Ouvrir le fichier _src/store.js_ et examiner le contenu du code implémentant le gestionnaire d'état de l'application **VIE-UI**. Un échantillon du code est présenté ci-dessous.

```javascript
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
  setName(newValue) { ... },

  setDescription(newValue) { ... },
  
  setVMSLength(newValue) { ... },
  ...
}

export default {
  state: readonly(state),
  system,
  methods
}
```

Vous remarquerez les classes qui décrivent les caractéristiques d'une machine virtuelle : `HardwareSpecification`, `Credentials` et `Network`. Nous avons regroupé ces caractéristiques dans des classes puisqu'elles sont utilisées à plusieurs endroits, soit globalement pour toutes les machines virtuelles (composant *Common*) ou soit dans chaque machine virtuelle (composant *VirtualMachine*). 

Vous remarquerez également que cette implémentation de gestionnaire d'état s'appuie sur des mécanismes fournis par [Vue.js](https://vuejs.org/) afin de fournir des propriétés réactives. Par exemple, l'objet `state` défini comme `reactive` contient toutes les propriétés pour stocker les informations du modèle de l'application **VIE-UI**. 

Enfin, vous noterez par le biais de la constante `methods` que nous utilisé le principe d'encapsulation afin d'éviter de modifier directement le contenu de `state`. En effet, une des préconisations du gestionnaire d'état et de fournir des mutateurs pour réaliser les modifications sur les propriétés du gestionnaire d'état. Des vérifications peuvent être nécessaires avant d'effectuer les modifications. Un échantillon de ces mutateurs est donné par les méthodes `setName`, `setDescription` et `setVMSLength` qui permettent de modifier les propriétés `name`, `description` et `vmsLength`. Pour éviter de modifier directement le contenu de `state` et forcer l'utilisation des mutateurs, le mot clé `readonly` est utilisé lors de l'utilisation du gestionnaire d'état par les différents composants (`export default`).

Voyons maintenant comment importer et utiliser ce gestionnaire d'état dans les composants de notre application **VIE-UI**.

* Ouvrir le fichier _App.vue_ et compléter par le code ci-dessous.

```html
<script setup>
import { provide } from 'vue'

import MenuBar from './components/MenuBar.vue'
import Global from './components/Global.vue'
import Footer from './components/Footer.vue'

import store from './store.js'

provide('STORE', store)
</script>

<template>
  <div class="container-fluid">
    <MenuBar />
    <Global />
    <Footer />
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css';
</style>
```

L'importation du gestionnaire d'état développé dans le fichier _store.js_ est réalisé comme un composant [Vue.js](https://vuejs.org/), `import store from './store.js'`. Pour diffuser le gestionnaire d'état à l'ensemble des composants, nous utilisons la fonction `provide` qui consiste pour un composant parent (ici *App*) à **fournir** à tous ses enfants une donnée via une clé. Dans notre cas, la clé sera `STORE` et le contenu sera une référence du gestionnaire d'état (composant décrit dans le fichier _store.js_). Les composants enfants pourront récupérer la référence du gestionnaire d'état via la fonction `inject`. Voyons cela via l'édition du composant *Global*.

* Éditer le fichier _Global.vue_ pour utiliser la fonction `inject` qui permettra de fournir la référence du gestionnaire d'état au composant *Global*.

```html
<script setup>
import { inject } from 'vue'
import VirtualMachine from './VirtualMachine.vue'

const store = inject('STORE')
...
</script>

<template>
  ...
</template>
```

L'accès au gestionnaire d'état se fera donc par l'intermédiaire de la propriété `store`.

Pour réaliser des liaisons bidirectionnelles entre les propriétés du gestionnaire d'état et la partie graphique fournie par la balise `<template>` nous allons devoir utiliser des mutateurs calculés (`computed`) puisque nous utiliserons la lecture depuis `state` et l'écriture depuis `methods`.

* Éditez le fichier _Global.vue_ et ajouter trois mutateurs calculés appelés `name`, `description` et `vmsLength`.

```html
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
  ...
</template>
```

Au niveau des accesseurs (`get()`), l'accès se fait directement via la propriété du gestionnaire d'état. Pour les mutateurs (`set(value)`), l'accès se fait via les mutateurs fournis par le gestionnaire d'état.

Les mutateurs calculés sont prêts à être utilisées directement dans la partie `<template>` du composant.

* Éditer de nouveau le fichier _Global.vue_ et utiliser pour les champs *name*, *description* et *Virtual Machines* la directive `v-model` pour créer des liaisons bidirectionnelles entre les mutateurs calculés et les composants graphiques.

```html
<script setup>
  ...
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
  ...
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
              <VirtualMachine />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
```

Le mutateur calculé `vmsLength` est modifiée par l'intermédiaire du composant graphique `<input ... v-model.lazy="vmsLength">`. Cette propriété permet alors de créer les instances du composant `<VirtualMachine>` via l'utilisation de la directive `v-for`.

* Finaliser le développement du composant *Global* en intégrant les propriétés du gestionnaire d'état suivantes : `templateId`, `hostname`, `memory`, `diskSize`, `core`, `socket`, `login`, `password` et `sshKey`. Pour chacune de ces propriétés, créer un mutateur calculé en effectuant la délégation vers le gestionnaire d'état et enfin créer une liaison bidirectionnelle en utilisant la directive `v-model`.

* Tester le développement réalisé. Vérifier qu'à chaque modification d'une propriété du gestionnaire d'état, un message est affiché sur la console. Vérifier également depuis l'outil **Vue-DevTools** que vous avez accès aux propriétés du gestionnaire d'état. Modifier directement les valeurs des mutateurs calculés pour vous assurer que l'interface graphique du composant *Global* est mise à jour.

## Avez-vous bien compris, valider vos compétences ? 

* Comme vous avez découvert les fonctionnalités d'un gestionnaire d'état *Do It Yourself*, utiliser la bibliothèque [Pinia](https://vuex.vuejs.org/).