# Exercice 6 : savoir communiquer avec les événements personnalisés 

Dans ce sixième exercice, nous allons réaliser une communication entre un composant parent et un composant enfant en utilisant les événements personnalisés. Pour cela, nous allons fournir une seconde implémentation pour le composant *VirtualMachineElement*. Cette nouvelle implémentation n'utilisera pas le gestionnaire d'état. Bien que ce dernier soit pratique pour fournir un modèle transverse à tous les composants, il impose aussi sa présence avec un modèle de données spécifique. Toute réutilisation de ce composant en dehors de cette application ne sera pas possible. Cette seconde implémentation du composant *VirtualMachineElement* se veut donc être générique, dans le sens où l'on puisse réutiliser ce composant pour d'autres développements sans forcément disposer d'un gestionnaire d'état transverse.

La solution de l'exercice 5 est disponible dans le répertoire _vuejs-spa-tutorial-exercice6/vie-app_.

## But

* Créer des événements personnalisés.
* Transmettre des objets via les événements personnalisés.
* S'abonner à des événements personnalisés.

## Étapes à suivre

La seconde implémentation du composant *VirtualMachineElement* est codée dans le fichier _VirtualMachineElementWithCustomEvent.vue_. Elle fournit en entrée des **props** contenant le nom de l'attribut `elementName` (par exemple : _Login_), un identifiant d'attribut `element` (par exemple : _Credentials-login_) et la valeur actuelle `value`(par exemple : _mbaron_). Les valeurs sont transmises à la création comme expliqué dans l'[exercice précédent](../vuejs-spa-tutorial-exercice5/README.md). 

```javascript
<script>
export default {
  name: "VirtualMachineElement",
  props: {
    elementName: {
      type: String,
      required: true,
    },
    element: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  ...
}
</script>
```

La mise à jour des valeurs des éléments sera faite par le composant parent *VirtualMachine* au niveau de l'abonnement aux événements de cette nouvelle implémentation de *VirtualMachineElement*.

* Éditer le fichier _VirtualMachineElementWithCustomEvent.vue_ et ajouter dans le code du mutateur de `elementValue` le code ci-dessous.

```javascript
<script>
export default {
  name: "VirtualMachineElement",
  ... // Contenu montré précédemment.
  computed: {
    elementValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("update-element-value", {
          element: this.element,
          value: value,
        });
      },
    },
  },
  methods: {
    removeElement() {
      ...
    },
  }
};
</script>
```

Ce code `this.$emit("update-element-value", { ... });` permet de créer un événement appelé `update-element-value` dont le contenu est un objet qui contient deux propriétés (`element` et `value`). Cet événement sera créé et envoyé vers le composant parent à chaque fois que l'utilisateur modifiera la valeur.

* Ajouter, sur le même principe que précédemment, un code dans le corps de la méthode `removeElement` permettant de créer un événement `remove-element` et qui transmet `element`. `removeElement` sera invoqué quand l'utilisateur cliquera sur le bouton supprimer.

Nous allons maintenant nous occuper à mettre à jour le code du composant *VirtualMachine* pour gérer cette nouvelle implémentation de *VirtualMachineElement*.

* Éditer le fichier *VirtualMachine* est mettre en commmentaire tout ce qui a un rapport avec la première implémentation (importation du composant, déclaration du composant et utilisation de la balise personnalisée).

* Importer la nouvelle implémentation du composant *VirtualMachineElement* à partir du fichier _VirtualMachineElementWithCustomEvent.vue_. L'importation portera le nom de `VirtualMachineElementWithCustomEvent`.

```javascript
import VirtualMachineElementWithCustomEvent from "@/components/VirtualMachineElementWithCustomEvent.vue";
```

* Déclarer ce nouveau composant pour qu'il soit utilisable dans la partie `<template>`.

```javascript
components: {
  VirtualMachineElementWithCustomEvent,
},
```

* Utiliser la balise personnalisée dans le corps de la directive de rendu.

```javascript
<VirtualMachineElementWithCustomEvent
  :elementName="getTranslate(val.element)"
  :element="getMergedCategoryAndElement(val.category, val.element)"
  :value="val.value"
  v-on:update-element-value="onUpdateElementValue"
  @remove-element="onRemoveElement"
/>
```

L'abonnement se fait par l'intermédiaire de la directive `v-on` ou sa version simplifiée `@`. Le premier abonnement signifie qu'à chaque émission de l'événement `update-element-value`, la méthode `onUpdateElementValue` est appelée. Sur le même principe à chaque fois que l'événement `remove-element` est émis, la méthode `onRemoveElement`est appelée.
