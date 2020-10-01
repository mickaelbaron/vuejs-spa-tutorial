# Exercice 3 : savoir instancier les composants 

Ce troisième exercice propose d'apprendre à instancier des composants en utilisant des balises personnalisées. Dans l'exercice précédent, nous avons écrit les fichiers *.vue* correspondant à tous les composants. 

Actuellement, tous les composants ont été développés indépendamment. 

La solution de l'exercice 2 est disponible dans le répertoire _vuejs-spa-tutorial-exercice3/vie-app_.

## But

* Savoir importer des composants.
* Savoir instancer des composants.

## Étapes à suivre

Nous allons commencer par le composant racine défini par le fichier _App.vue_. C'est le composant parent des composants *MenuBar*, *Import*, *Common* ou *Export*. Pour les trois derniers composants, le choix sera fait en fonction du routage choisi (voir dernier exercice). Pour simplifier, nous utiliserons directement les composant *MenuBar et *Common*.

* Éditer le fichier _App.vue_ et compléter par le code ci-dessous.

```html
<template>
  <div class="container-fluid" id="app">
    <menuBar />
  </div>
</template>

<script>
import menuBar from "@/components/MenuBar.vue";

export default {
  name: "App",
  components: { menuBar },
};
</script>

<style>
</style>
```

Petite précision sur le code ci-dessus. Le fichier _MenuBar.vue_ qui décrit le composant *MenuBar* est importé dans le composant racine `import menuBar from "@/components/MenuBar.vue"`. Il est associé à la balise personnalisée `<menuBar>` et utilisable dans le code du composant racine `components: { menuBar }`. Par conséquent, il est possible d'utiliser cette balise personnalisée dans la partie `<template>`.

* Compléter le fichier _App.vue_ afin d'ajouter le composant *Common* au composant racine.

* Tester l'application via la ligne de commande `$ npm run serve`. Vous devriez obtenir le résultat suivant.

![Application avec les composants MenuBar et Common](./images/root-component.png "Application avec les composants MenuBar et Common")

Nous allons maintenant utiliser les composants *VirtualMachine* et *VirtualMachineElement* en simplifiant le code puisque nous n'avons pas encore présenté le gestionnaire d'état.

* Éditer le fichier _src/components/Common.vue_ en déclarant le composant *VirtualMachine*.

```html
<script>
import VirtualMachine from "@/components/VirtualMachine.vue";

export default {
  name: "Common",
  components: {
    VirtualMachine,
  }
};
</script>
```

TODO: nous allons ajouter une propriété permettant de stocker le nombre de machine virtuelle

```html
<script>
import VirtualMachine from "@/components/VirtualMachine.vue";

export default {
  name: "Common",
  components: {
    VirtualMachine,
  },
  data() {
    return {
      vmsLength: 1,
    };
  },
};
</script>
```

TODO: prise en compte de cette propriété

```html
    ...
    <div class="card mt-3">
      <div class="card-header">
        <div class="form-inline">
          <div class="form-group">
            <label for="inputNumberOfVM">Virtual Machines</label>
          </div>
          <div class="form-group mx-2">
            <input type="text" class="form-control" id="inputNumberOfVM" v-model.number.lazy="vmsLength" placeholder="Number of VM" />
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

## Avez-vous bien compris, valider vos compétences ? 

* Déclarer dans le composant VirtualMachine le composant VirtualMachineElement
* Utiliser le composant VirtualMachine