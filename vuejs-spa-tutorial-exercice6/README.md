# Exercice 6 : savoir communiquer avec les Props 

Dans ce sixième exercice, nous allons réaliser une communication entre un composant parent et un composant enfant en utilisant des **Props**. Les **props** sont des propriétés qui sont déclarées au niveau de la fonction `defineProps` d'un composant dont les valeurs sont initialisées par son composant parent.

La solution de l'exercice 5 est disponible dans le répertoire _vuejs-spa-tutorial-exercice6/vie-app_.

## But

* Déclarer des **props** dans un composant.
* Utiliser des **props** dans un composant.
* Savoir instancier un composant en lui transmettant des valeurs à ses **props**.

## Étapes à suivre

Le composant *VirtualMachine* a besoin de connaître lors de sa création son index par rapport au gestionnaire d'état (propriété `state.vms` du fichier _store.js_). Cette information sera transmise par le composant *Global* en utilisant la communication par **props**.

* Éditer le fichier _VirtualMachine.vue_ et ajouter la fonction `defineProps` où seront déclarées les **props** du composant *VirtualMachine*.

```javascript
<script setup>
import { inject } from 'vue'

import VirtualMachineElement from './VirtualMachineElement.vue'

const store = inject('STORE')

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  }
})
</script>
```

Suivant la conception définie dans l'[exercice 1](../vuejs-spa-tutorial-exercice1/README.md), la **prop** `currentIndex` déclare un nombre (`type: Number`) qui est obligatoire (`required: true`). Veuillez noter aussi l'utilisation de la fonction `inject` qui permet d'utiliser dans ce composant le gestionnaire d'état.

Une **prop** est utilisable au même titre qu'une propriété de composant, ainsi pour accéder à la **prop** `currentIndex` dans la zone `script` ou `template` il suffira juste de la nommer.

* Éditer le fichier _VirtualMachine.vue_ et compléter le code afin d'utiliser une interpollation de texte à partir de la **prop** `currentIndex`.


```html
...
<template>
  <div class="col">
    <div class="card bg-light">
      <div class="card-header">
        <div class="row g-3 align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <label>VM {{ currentIndex + 1 }}</label>
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
        <VirtualMachineElement />
      </div>
    </div>
  </div>
</template>
```

Si par contre vous souhaitez utiliser une **prop** à l'intérieur de la zone `script` vous devrez passer par l'écriture suivante : `props.currentIndex`.

* Éditer de nouveau le fichier _VirtualMachine.vue_ et compléter le code afin d'ajouter une fonction qui sera appelée lorsque l'utilisateur souhaitera supprimer une configuration d'une machine virtuelle.

```javascript
<script setup>
import { inject} from 'vue'

import VirtualMachineElement from './VirtualMachineElement.vue'

const store = inject('STORE')

const props = defineProps({
  currentIndex: {
    type: Number,
    required: true
  }
})

function onRemoveVM() {
  store.methods.removeVM(props.currentIndex)
}
</script>
```

Nous allons maintenant nous intéresser au passage d'information lors de la création du composant *VirtualMachine* depuis le composant *Global*.

* Éditer le fichier _Global.vue_ et compléter le code comme montré ci-dessous.

```javascript
      <div class="card-body">
        <div class="card-columns">
          <div v-for="index in vmsLength" :key="index">
            <VirtualMachine :current-index="index-1" />
          </div>
        </div>
      </div>
```

Le passage du nombre `index-1` est transmis via une propriété dynamique (`:current-index` équivalent à `v-bind:current-index`). Même s'il s'agit d'une valeur statique, il est obligatoire de passer par `v-bind` pour dire à [Vue.js](https://vuejs.org/) que c'est une expression JavaScript et non pas une chaine de caractères. 

Veuillez noter également que le nom de la propriété `current-index` n'est pas le même que le nom déclaré dans le composant *VirtualMachine* `currentIndex`. En effet, la convention impose que les propriétés soient déclarées en utilisant l'écriture camelCase (pas d'espace, ni ponctuation et en mettant en capitale la première lettre de chaque mot excepté le premier mot) et que les attributs utilisés dans les balises soient déclarées en utilisant l'écriture kebab-case (pas d'espace, ni ponctuation et en séparant chaque mot par des `-`).

* Tester le développement réalisé et s'assurer que la numérotation des machines virtuelles est incrémentale.

## Avez-vous bien compris, valider vos compétences ? 

Le composant *VirtualMachineElement* a besoin de connaître lors de sa création l'index de la machine virtuelle courante, la catégorie de l'élément (`HardwareSpecification`, `Credentials` et `Network`) et la propriété de la catégorie (par exemple : `core` pour la catégorie `HardwareSpecification`). Ces informations seront obligatoirement transmises par le composant *VirtualMachine* en utilisant la communication par **props**.

* Éditer le composant *VirtualMachineElement* pour ajouter trois nouvelles **props**.

* Éditer le composant *VirtualMachine* pour transmettre les trois valeurs aux trois **props** lors de la création du composant *VirtualMachineElement*.