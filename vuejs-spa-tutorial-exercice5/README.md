# Exercice 5 : savoir communiquer avec les Props 

Dans ce cinquière exercice, nous allons réaliser une communication entre un composant parent et un composant enfant en utilisant des **Props**. Les **props** sont des propriétés qui sont déclarées au niveau de la zone `props` d'un composant (la partie JavaScript d'un composant).

La solution de l'exercice 4 est disponible dans le répertoire _vuejs-spa-tutorial-exercice5/vie-app_.

## But

* Déclarer des **props** dans un composant.
* Utiliser des **props** dans un composant.
* Savoir instancier un composant en lui transmettant des valeurs à ses **props**.

## Étapes à suivre

Le composant *VirtualMachine* a besoin de connaître lors de sa création son index par rapport au gestionnaire d'état (propriété `vms` du fichier _store.js_). Cette information sera transmise par le composant *Common* en utilisant la communication par **props**.

* Éditer le fichier _VirtualMachine.vue_ et ajouter sous la zone `data()` une zone appelée `props` où seront stockées les **props** du composant *VirtualMachine*.

```javascript
export default {
  name: "VirtualMachine",
  components: {
    VirtualMachineElement,
  },
  data() {
    return {
      selected: NO_VALUE,
      storeState: store.state,
      currentIndex: 0
    };
  },
  props: {
    currentIndex: {
      type: Number,
      required: true,
    }
  },
}
```

Suivant la conception définie dans l'[exercice 1](../vuejs-spa-tutorial-exercice1/README.md), la **prop** `currentIndex` déclare un nombre (`type: Number`) qui est obligatoire (`required: true`).

* Éditer de nouveau le fichier _VirtualMachine.vue_ et supprimer la propriété `currentIndex: 0` qui servait de propriété temportaire en attendant d'utiliser des **props**.

Une *prop* est utilisable au même titre qu'une propriété de composant, voir dans le code de la propriété calculée `vms`.

```javascript
export default {
  name: "VirtualMachine",
  components: {
    VirtualMachineElement,
  },
  data() {
    return {
      selected: NO_VALUE,
      storeState: store.state,
    };
  },
  props: {
    currentIndex: {
      type: Number,
      required: true,
    }
  },
  computed: {
    vms: {
      get() {
        return this.storeState.vms[this.currentIndex];
      },
    },
  }
}
```

Nous allons maintenant nous intéresser au passage d'information lors de la création du composant *VirtualMachine* depuis le composant *Common*.

* Éditer le fichier _Common.vue_ et compléter le code comme montré ci-dessous.

```javascript
      <div class="card-body">
        <div class="card-columns">
          <div v-for="index in vmsLength" :key="index">
            <VirtualMachine :currentIndex="index-1" />
          </div>
        </div>
      </div>
```

Le passage du nombre `index-1` est transmis via une propriété dynamique (`:currentIndex` équivalent à `v-bind:currentIndex`). Même s'il s'agit d'une valeur statique, il est obligatoire de passer par `v-bind` pour dire à [Vue.js](https://vuejs.org/) que c'est une expression JavaScript et non pas une chaine de caractères.

* Tester le développement réalisé et s'assurer que la numérotation des machines virtuelles est incrémentale.

## Avez-vous bien compris, valider vos compétences ? 

Le composant *VirtualMachineElement* a besoin de connaître lors de sa création l'index de la machine virtuelle courante, la catégorie de l'élément (`HardwareSpecification`, `Credentials` et `Network`) et la propriété de la catégorie (par exemple : `core` pour la catégorie `HardwareSpecification`). Ces informations seront obligatoirement transmises par le composant *VirtualMachine* en utilisant la communication par **props**.

* Éditer le composant *VirtualMachineElement* pour ajouter trois nouvelles **props**.

* Éditer le composant *VirtualMachine* pour injecter les trois **props** lors de la création du composant *VirtualMachineElement*.