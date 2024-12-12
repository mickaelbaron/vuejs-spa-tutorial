# Exercice 3 : savoir créer des composants à partir d'un template HTML

Ce troisième exercice propose de transformer le code fourni par la maquette HTML en composant [Vue.js](https://vuejs.org/) depuis le projet créé dans l'exercice précédent.

Pour rappel la maquette graphique est disponible dans le répertoire _htmldesign/_.

## But

* Développer des composants dans des fichiers portant l'extension *.vue*.
* Déclarer des bibliothèques CSS.

## Étapes à suivre

Avant de développer les différents composants en créant les fichiers au format *.vue*, nous allons déclarer la bibliothèque CSS [Bootstrap](https://getbootstrap.com) dans le projet [Vue.js](https://vuejs.org/). Plusieurs possibilités sont offertes :

* en intégrant directement les fichiers compilés CSS et JS dans le projet ;
* en référençant des liens depuis un CDN (Content Delivery Network) ;
* en utilisant un gestionnaire de dépendance.

C'est la dernière solution que nous utiliserons puisque dans le cas de ces exercices nous utilisons [npm](https://www.npmjs.com/). L'avantage de cette solution est de pouvoir gérer toutes les dépdendances a un même endroit, ce qui facilitera les futures montées vers des versions plus récentes des bibliothèques que nous utilisons.

* Ouvrir un terminal, se positionner à la racine du dossier _vuejs-spa-tutorial-exercice2/vie-app_ et saisir les lignes de commande ci-dessous pour installer et déclarer dans le fichier package.json les dépendances vers [Bootstrap](https://getbootstrap.com).

```console
# Ajout de la dépendance Boostrap (CSS et JS)
$ npm install --save bootstrap

# Ajout de la dépendance Boostrap-Icons pour intégrer une bibliothèque d'icônes
$ npm install --save bootstrap-icons

# Ajout de la dépendance popperjs pour la gestion du positionnement de certains éléments (popup, tooltip...)
$ npm install --save @popperjs/core
```

À la fin de cette opération le fichier _package.json_ aura été impacté comme présenté ci-dessous.

```json
{
  "name": "vie-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore --fix src",
    "format": "prettier .  --write"
  },
  "dependencies": {
    "@popperjs/core": "^2.11.6",
    "bootstrap": "^5.2.3",
    "bootstrap-icons": "^1.10.3",
    "vue": "^3.2.41"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.2.0",
    "eslint": "^8.28.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-vue": "^9.8.0",
    "prettier": "2.8.0",
    "vite": "^3.2.3"
  }
}
```

* Afin de déclarer la bibliothèque [Bootstrap](https://getbootstrap.com), éditer le fichier _main.js_ et ajouter les trois lignes d'importation.

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// Dépendance vers le fichier CSS de Bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
// Dépendance vers le fichier CSS de Bootstrap-Icons
import "bootstrap-icons/font/bootstrap-icons.css"
// Dépendance vers le fichier JavaScript de Bootstrap (pour gérer les aspects dynamiques)
import "bootstrap"

const app = createApp(App)

app.mount('#app')
```

> Afin de s'assurer que la modification a été prise en compte, vous pouvez tester l'application (`$ npm run dev`) et vérifier que le contenu de la balise `<head>` contient la déclaration des deux bibliothèques.

Nous allons maintenant créer tous les composants de l'application. Sur le code présenté ci-dessous sont détaillées les balises racines qui permettent d'identifier le code à copier dans les fichiers `*.vue`. Par exemple pour le composant *MenuBar*, il suffira de copier le contenu de la balise `<header>`.

```html
<body>
    <div class="container-fluid">
        <!-- Composant MenuBar.vue -->
        <header>
            ...
        </header>

        <!-- Composant Global.vue -->
        <main>
            ...
            <!-- Contenu VirtualMachine.vue -->
            <div class="col">
                ...
                <!-- Contenu VirtualMachineElement.vue -->
                <div class="form-group mb-2">
                    ...
                </div>
            </div>
        </main>
        <!-- Composant Footer.vue -->
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        </footer>
    </div>
</body>
```

* Créer un fichier _src/components/MenuBar.vue_ et copier le contenu de la balise `<header>` à l'intérieur de la balise `<template>` comme montré sur le code ci-dessous.

```html
<script setup></script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div class="container-fluid">
        <span class="navbar-brand">VIE-IE</span>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
            <li class="nav-item">
              <a class="nav-link" href="#">Import</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Export</a>
            </li>
          </ul>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label
              class="form-check-label text-white-50"
              for="flexSwitchCheckDefault"
              >Debug Mode</label
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>
```

* Créer un fichier _src/components/Footer.vue_ et copier le contenu de la balise `<footer>` à l'intérieur de la balise `<template>` comme montré sur le code ci-dessous.

```html
<script setup></script>

<template>
  <footer
    class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
  >
    <div class="col-md-6 d-flex align-items-center">
      <span class="text-muted"
        >Developped with
        <i class="bi-heart-fill" style="font-size: 1rem; color: red"></i> by
        Mickael BARON</span
      >
    </div>

    <ul class="nav col-md-6 justify-content-end list-unstyled d-flex">
      <li class="ms-3">
        <a
          class="text-muted"
          target="_blank"
          href="https://twitter.com/mickaelbaron"
          ><i class="bi-twitter" style="font-size: 1rem"></i
        ></a>
      </li>
      <li class="ms-3">
        <a
          class="text-muted"
          target="_blank"
          href="https://github.com/mickaelbaron"
          ><i class="bi-github" style="font-size: 1rem"></i
        ></a>
      </li>
    </ul>
  </footer>
</template>
```

* Créer un fichier _src/components/Global.vue_ et copier le contenu de la balise `<main>` à l'intérieur de la balise `<template>` comme montré sur le code ci-dessous. Ce composant *Global* a une dépendance vers le composant *VirtualMachine*. Veuillez donc ne pas copier le contenu HTML relatif à ce composant. Le résultat attendu est montré sur le code ci-dessous.

```html
<script setup></script>

<template>
  <main>
    <div class="container-fluid">
        ... 
    </div>

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
                type="text"
                class="form-control"
                placeholder="Number of VM"
              />
            </div>
          </div>
        </div>
        <div class="card-body">
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
          <!-- VirtualMachine component -->
        </div>
      </div>
    </div>
  </main>
</template>
```

* Créer un fichier _src/components/VirtualMachine.vue_ et copier le contenu de la balise `<div class="col">` (voir le contenu présentant les principales balises). Ce composant *VirtualMachine* a une dépendance vers le composant *VirtualMachineElement*. Veuillez donc ne pas copier le contenu HTML relatif à ce composant. Le résultat attendu est montré sur le code ci-dessous.

```html
<script setup></script>

<template>
  <div class="col">
    <div class="card bg-light">
      <div class="card-header">
        <div class="row g-3 align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <label>VM</label>
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
      </div>
    </div>
  </div>
</template>
```

* Créer un fichier _src/components/VirtualMachineElement.vue_ et copier le contenu de la balise `<div class="form-group mb-2">`(voir le contenu présentant les principales balises). Le résultat attendu est montré sur le code ci-dessous.

```html
<script setup></script>

<template>
  <div class="form-group mb-2">
    <label class="form-label" for="inputName"></label>
    <div class="input-group">
      <input type="text" class="form-control" placeholder="" />
      <div class="input-group-prepend">
        <button class="btn bi-trash-fill" type="button"></button>
      </div>
    </div>
  </div>
</template>
```

Si vous testez l'application, il n'y aura aucun affichage car nous n'avons pas encore instancié les composants, il s'agit de l'objectif de l'exercice suivant.

## Avez-vous bien compris, valider vos compétences ? 

* Développer les composants *Import* et *Export* dans les fichiers *Import.vue* et *Export.vue*.

* Depuis les templates HTML fournis par le site [HTML5 UP](https://html5up.net/), choisir un template et refaire le même découpage en composant.
