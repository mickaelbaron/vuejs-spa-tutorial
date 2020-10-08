# Exercice 4 : savoir communiquer avec le gestionnaire d'état 

Dans ce quatrième exercice, nous allons commencer à faire communiquer les composants entre eux. La première technique utilisée sera le gestionnaire d'état qui permet de fournir un modèle transverse à tous les composants. Ce modèle n'est pas un composant [Vue.js](https://vuejs.org/), il est développé comme un code JavaScript classique.

Pour la mise en place du gestionnaire d'état de type *Do It Yourself*, nous avons suivi les préconisations proposées [ici](https://vuejs.org/v2/guide/state-management.html). Nous n'utiliserons pas de bibliothèque spécifique telle que [Vuex](https://vuex.vuejs.org/). L'idée étant de maîtriser ce patron de conception avant l'utilisation d'implémentation prête à l'emploi comme [Vuex](https://vuex.vuejs.org/).

La solution de l'exercice 3 est disponible dans le répertoire _vuejs-spa-tutorial-exercice4/vie-app_.

## But

* Développer le patron de conception gestionnaire d'état.
* Utiliser des propriétés calculées.
* Réaliser des liaisons bidirectionnelles (modèle/vue) avec des propriétés calculées via des accesseurs (get) et des mutateurs (set).
* Contrôler le contenu du gestionnaire d'état via l'outil **Vue-DevTools**.

## Étapes à suivre

Nous allons supprimer le code ajouté à la fin de l'exercice 3 (tout ce qui concerne l'utilisation de la propriété `vmsLengthTemp`) avant d'ajouter la liaison avec le gestionnaire d'état.

* Éditer le fichier _Common.vue_ et supprimer tout le code qui a été ajouté pour gérer la propriété `vmsLengthTemp`.

* Ouvrir le fichier _src/store.js_ et examiner le contenu du code implémentant le gestionnaire d'état de l'application **VIE-UI**. Un échantillon du code est présenté ci-dessous.

```javascript
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

    setNameAction(newValue) {
        if (this.debug) console.log('setMessageAction triggered with', newValue)

        this.state.name = newValue
    },

    setDescriptionAction(newValue) {
        if (this.debug) console.log('setDescriptionAction triggered with', newValue)

        this.state.description = newValue
    },
    ...
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
        ...
    }
}
```

Ce gestionnaire d'état, déjà présenté dans l'exercice 1 lié à la conception, devra être utilisé dans les composants qui auront besoin de stocker les informations. Il s'agira des composants *Export*, *Import*, *Common*, *VirtualMachine* et *VirtualMachineElement*. Veuillez noter la présence du mot clé `const` qui permet d'avoir une seule instance de `store`.

Une des préconisations du gestionnaire d'état et de fournir des mutateurs pour réaliser les modifications sur les propriétés du gestionnaire d'état (principe d'encapsulation). En effet, des vérifications peuvent être nécessaires avant d'effectuer les modifications. Nous montrons sur le code ci-dessous du fichier _store.js_, un échantillon de ces mutateurs qui permettent de modifier les propriétés `name`, `description` et `vmsLength`.

Pour les mutateurs `setNameAction` et `setDescriptionAction` aucun contrôle n'est effectué. Pour le mutateur `setVMSLength`, la vérification est plus complexe. Nous vérifions d'une part que la valeur saisie par l'utilisateur est un entier et d'autre part que les bornes minimum et maximum ne sont pas atteintes. Dans tous les mutateurs, nous avons ajouté une fonctionnalité permettant d'afficher sur la console les valeurs envoyées au gestionnaire d'état. Nous pouvons contrôler cet affichage en changeant la valeur de la propriété `debug`.

Nous allons voir comment importer ce fichier _store.js_ dans un fichier *.vue* décrivant un composant. 

* Ouvrir le fichier _common.vue_ et compléter par le code ci-dessous.

```javascript
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
}
```

Le fichier _store.js_ est importé en utilisant l'alias `store`. Afin de rendre tout le contenu du gestionnaire d'état « réactif » (c'est-à-dire utilisable dans la partie `<template>` d'un composant [Vue.js](https://vuejs.org/)), nous déclarons une propriété `storeState: store.state` dans le composant *Common*. Pour réaliser des liaisons bidirectionnelles entre les propriétés du gestionnaire d'état et la partie graphique fournie par la balise `<template>` nous allons utiliser des propriétés calculées (`computed`).

* Ouvrir le fichier _Common.vue_ et ajouter dans la partie `computed` trois propriétés calculées appelées `name`, `description` et `vmsLength`.

```javascript
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
    ...
    vmsLength: {
      get() {
        return this.storeState.vmsLength;
      },
      set(value) {
        store.setVMSLength(value);
        this.$forceUpdate();
      },
    }
  }
}
```

Au niveau des accesseurs (`get()`), l'accès se fait directement via la propriété du gestionnaire d'état. Pour les mutateurs (`set(value)`), l'accès se fait via les mutateurs fournis par le gestionnaire d'état.

Les propriétés calculées sont prêtes à être utilisées directement dans la partie `<template>` du composant.

* Éditer de nouveau le fichier _Common.vue_ et utiliser pour les champs *name*, *description* et *Virtual Machines* la directive `v-model` pour créer des liaisons bidirectionnelles pour les propriétés calculées définies précédemment.

```html
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
    ...
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
            <VirtualMachine />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

La propriété `vmsLength` est modifiée par l'intermédiaire du composant graphique `<input ... v-model.lazy="vmsLength">`. Cette propriété permet alors de créer les instances du composant `<VirtualMachine>` via l'utilisation de la directive `v-for`.

* Finaliser le développement du composant *Common* en intégrant les propriétés du gestionnaire d'état suivantes : `templateId`, `hostname`, `memory`, `diskSize`, `core`, `socket`, `login`, `password` et `sshKey`. Pour chacune de ces propriétés, créer une propriété calculée en effectuant la délégation vers le gestionnaire d'état et enfin créer une liaison bidirectionnelle en utilisant la directive `v-model`.

* Tester le développement réalisé. Vérifier qu'à chaque modification d'une propriété du gestionnaire d'état, un message est affiché sur la console. Vérifier également depuis l'outil **Vue-DevTools** que vous avez accès aux propriétés du gestionnaire d'état. Modifier directement les valeurs du gestionnaire d'état pour vous assurer que l'interface graphique du composant *Common* est mise à jour.

## Avez-vous bien compris, valider vos compétences ? 

* Comme vous avez découvert les fonctionnalités d'un gestionnaire d'état *Do It Yourself*, utiliser la bibliothèque [Vuex](https://vuex.vuejs.org/) pour gérer plus efficacement le getionnaire d'état.

