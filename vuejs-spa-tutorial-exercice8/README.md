# Exercice 8 : savoir construire des routes

Dans ce huitième exercice, nous allons mettre en place le routage qui permet en fonction de l'état de l'URL de choisir quel composant sera affiché :

* _/_ : affichage du composant *Global* ;
* _/import_ : affichage du composant *Import* ;
* _/export_ : affichage du composant *Export*.

[Vue.js](https://vuejs.org/) propose un module appelé [Vue-Router](https://router.vuejs.org/) qui offre un mécanisme de gestion du routage. [Vue-Router](https://router.vuejs.org/) s’appuie sur un fichier de routage pour établir les différentes règles qui permettent de passer d’un composant à un autre en fonction de la valeur de l’URL.

## But

* Activer le routage.
* Créer une table de routage.
* Forcer le changement de route.

## Étapes à suivre

Nous allons d'abord initialiser le projet afin d'utiliser [Vue-Router](https://router.vuejs.org/) qui est une dépendance externe à [Vue.js](https://vuejs.org/).

* Depuis la racine du répertoire _vuejs-spa-tutorial-exercice8/vie-app_, exécuter la ligne de commande suivante.

```console
$ npm install vue-router

added 2 packages, and audited 147 packages in 872ms

32 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

* Créer un dossier _src/router_ puis ajouter un fichier _index.js_ en recopiant le code ci-dessous.

```javascript
import { createRouter, createWebHistory } from 'vue-router'

import Global from '../components/Global.vue'
import Import from '../components/Import.vue'
import Export from '../components/Export.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

export default router
```

Ce fichier _index.js_ contrôle le routage de l’application. Les composants développés précédemment sont importés pour être utilisés dans les règles de routage.

* Éditer le fichier _App.vue_ afin de déléguer au routage le choix du composant et éditer par le code présenté ci-dessous.

```javascript
<script setup>
import { provide } from 'vue'
import { RouterView } from 'vue-router'

import MenuBar from './components/MenuBar.vue'
import Footer from './components/Footer.vue'

import store from './store.js'

provide('STORE', store)
</script>

<template>
  <div class="container-fluid">
    <MenuBar />
    <RouterView />
    <Footer />
  </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css';
</style>
```

Vous remarquerez que le composant *Global* n'est plus référencé. En effet, le routage en fonction de la route choisie décidera de placer le composant *Global*, *Import* ou *Export*.

* Éditer le fichier _main.js_ afin d'activer le routage dans toute l'application.

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
```

Le routage est désormais installé et activé. Nous allons détailler comment définir des règles de routage.

* Éditer le fichier _src/router/index.js_ en complétant par le code présenté dans l’objet `Router`.

```javascript
import { createRouter, createWebHistory } from 'vue-router'

import Global from '../components/Global.vue'
import Import from '../components/Import.vue'
import Export from '../components/Export.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/export',
      name: 'Export',
      component: Export
    },
    {
      path: '/',
      name: 'Global',
      component: Global
    },
    {
      path: '/import',
      name: 'Import',
      component: Import
    }
  ]
})

export default router
```

Trois règles de routage ont été définies dans `routes` correspondant aux besoins exprimés en début de section. Pour chaque élément d’une route, trois propriétés sont utilisées : `path`, `name` et `component`. La valeur proposée dans la propriété `path` correspond à un _pattern_ qui doit être satisfait pour activer une route. Si la route est activée alors c’est le composant donné par la propriété component qui sera retourné. À titre d’exemple, pour la règle de routage définie par `path: '/` c’est le rendu du composant *Global* qui sera intégré à la place de la balise <RouterView> du fichier _App.vue_.

À cet instant si vous testez l’application, vous ne pourrez changer l’affichage de l’application que par l’intermédiaire de la barre d’adresse. Malheureusement en forçant le changement d'adresse depuis le navigateur vous demanderez une nouvelle requête et vous perderez le contexte d'exécution. Nous allons voir comment changer la route de manière programmatique par l'intermédiaire des fonctions `useRouter` et `useRoute`.

* Éditer le fichier _src/components/MenuBar.vue_ correspondant au composant *MenuBar* et ajouter l'importation et la création d'objet `useRouter` et `useRoute`.

```javascript
<script setup>
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'

const router = useRouter()
const route = useRoute()

const store = inject('STORE')

function isActiveRoute(value) {
  return route.name === value
}

function changeRoute(value) {
  console.log(store.system.debug)
  router.push({
    name: value
  })
}
</script>
```

L'objet `router` va permettre de changer la route tandis que l'objet `route` permettra de connaître l'état de la route.

* Editer de nouveau le fichier _src/components/MenuBar.vue_ pour impacter la zone `template` afin 1) mettre en gras l'élément du menu qui est actif (soit _Home_, _Import_ ou _Export_) et 2) forcer le changement de route lors de l'écoute d'événements.

```html
<template>
  <header>
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand">VIE-IE</span>
        <div id="navbarNav" class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link"
                :class="{ active: isActiveRoute('Global') }"
                href="#"
                @click="changeRoute('Global')"
                >Home</a
              >
            </li>
    ...
</template>
```

Le code `:class="{ active: isActiveRoute('Global') }"` permettra de mettre en gras l'élément courant en fonction de la valeur de la route et le code `@click="changeRoute('Global')"` permettra de changer la route vers le chemin `Global`.

* Compléter le fichier _src/components/MenuBar.vue_ pour traiter les éléments de menu _Import_ et _Export_.

* Tester l'application complète.

Vous remarquerez que si vous utilisez directement le menu au lieu de passer par l'URL du navigateur, vous ne perdrez pas le contexte d'exécution.