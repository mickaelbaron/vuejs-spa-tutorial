# Exercice 7 : savoir communiquer avec les événements personnalisés 

Dans ce septième exercice, nous allons réaliser une communication entre un composant parent et un composant enfant en utilisant les événements personnalisés. Pour cela, nous allons fournir une seconde implémentation pour le composant *VirtualMachineElement*. Cette nouvelle implémentation n'utilisera pas le gestionnaire d'état. Bien que ce dernier soit pratique pour fournir un modèle transverse à tous les composants, il impose aussi sa présence avec un modèle de données spécifique. Ainsi toute réutilisation du qui est fortement couplé avec un gestionnaire d'état en dehors de l'application ne sera pas possible.

Cette seconde implémentation du composant *VirtualMachineElement* se veut donc être générique, dans le sens où l'on puisse réutiliser ce composant pour d'autres développements sans forcément disposer d'un gestionnaire d'état transverse.

## But

* Créer des événements personnalisés.
* Transmettre des objets via les événements personnalisés.
* S'abonner à des événements personnalisés.

## Étapes à suivre

La seconde implémentation du composant *VirtualMachineElement* est codée dans le fichier _VirtualMachineElementWithCustomEvent.vue_. Elle fournit en entrée des **props** contenant le nom de l'attribut `elementName` (par exemple : _Login_), un identifiant d'attribut `element` (par exemple : _Credentials-login_) et la valeur actuelle `value` (par exemple : _mbaron_). Les valeurs sont transmises à la création comme expliqué dans l'[exercice précédent](../vuejs-spa-tutorial-exercice6/README.md). 

* Créer un fichier _src/components/VirtualMachineElementWithCustomEvent.vue_ et copier le contenu suivant.

```javascript
<script setup>
import { computed } from 'vue'

const props = defineProps({
  elementName: {
    type: String,
    required: true
  },
  element: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
})

...
</script>
```

La mise à jour des valeurs des éléments sera faite par le composant parent *VirtualMachine* au niveau de l'abonnement aux événements de cette nouvelle implémentation de *VirtualMachineElement*.

* Éditer le fichier _src/components/VirtualMachineElementWithCustomEvent.vue_ et ajouter dans le code du mutateur de `elementValue` le code ci-dessous.

```javascript
<script setup>
...
const emit = defineEmits(['update-element-value', 'remove-element'])

function removeElement() {
  emit('remove-element', props.element)
}

const elementValue = computed({
  get() {
    return props.value
  },
  set(pValue) {
    emit('update-element-value', {
      element: props.element,
      value: pValue
    })
  }
})
</script>
```

L'utilisation du mutateur calculé est rendu nécessaire car nous n'utilisons pas une propriété la même source pour la lecture et l'écriture. Pour la lecture il s'agit de la **props** `value` et pour l'écriture il s'agit d'utiliser un événement personnalisé.

Le code `const emit = defineEmits(['update-element-value', 'remove-element'])` permet de déclarer deux événements personnalisés appelés `update-element-value` et `remove-element`. L'événement `update-element-value` sera envoyé vers le composant parent à chaque fois que l'utilisateur modifiera la valeur. L'événement `remove-element` sera envoyé vers le composant parent une fois pour détruire le composant en question. L'envoi se fait par l'intermédiaire de `emit`. Cette fonction prend en premier paramètre le nom de l'événement et en second paramètre les valeurs à transmettre (exemple : `{element: "hardware-socket", value: "5"`). 

Nous allons maintenant nous occuper à mettre à jour le code du composant *VirtualMachine* pour gérer cette nouvelle implémentation du composant *VirtualMachineElement*.

* Éditer le fichier *VirtualMachine* est mettre en commmentaire tout ce qui a un rapport avec la première implémentation (importation du composant utilisation de la balise personnalisée).

```html
<script setup>
// import VirtualMachineElement from './VirtualMachineElement.vue'
...
</script>
<template>
    ...
        <div v-for="(val, key) in elements" :key="key">
          <!-- <VirtualMachineElement
            :current-index="currentIndex"
            :category="val.category"
            :element="val.element"
          /> -->
        </div>
      </div>
    </div>
  </div>
</template>
```

* Importer la nouvelle implémentation du composant *VirtualMachineElement* à partir du fichier _VirtualMachineElementWithCustomEvent.vue_. L'importation portera le nom de `VirtualMachineElementWithCustomEvent`.

```javascript
<script setup>
// import VirtualMachineElement from './VirtualMachineElement.vue'
import VirtualMachineElementWithCustomEvent from "@/components/VirtualMachineElementWithCustomEvent.vue";
...
</script>
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

L'abonnement se fait par l'intermédiaire de la directive `v-on` ou sa version simplifiée `@`. Le premier abonnement signifie qu'à chaque émission de l'événement `update-element-value`, la fonction `onUpdateElementValue` est appelée. Sur le même principe à chaque fois que l'événement `remove-element` est émis, la fonction `onRemoveElement`est appelée.

> Pour information les fonctions `onUpdateElementValue` et `onRemoveElement` sont déjà présentes.
