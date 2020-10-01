# Exercice 2 : savoir créer un projet et des composants

Ce deuxième exercice propose de construire un projet [Vue.js](https://vuejs.org/) à partir de l'outil **Vue CLI** et de transformer le code fourni par la maquette en composants [Vue.js](https://vuejs.org/). 

Pour rappel la maquette graphique est disponible dans le répertoire _htmldesign/_.

## But

* Manipuler l'outil **Vue CLI**.
* Construire un projet [Vue.js](https://vuejs.org/) à partir d'un assistant.
* Construire et tester une application web [Vue.js](https://vuejs.org/).
* Développer un composant avec un fichier portant l'extension *.vue*.


## Étapes à suivre

* Ouvrir un terminal et saisir la commande suivante pour vérifier que l'outil **Vue CLI** fonctionne correctement.

```console
$ vue info

Environment Info:

  System:
    OS: macOS 10.15.6
    CPU: (12) x64 Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
  Binaries:
    Node: 14.2.0 - /usr/local/bin/node
    Yarn: 1.22.4 - /usr/local/bin/yarn
    npm: 6.14.8 - /usr/local/bin/npm
  Browsers:
    Chrome: 85.0.4183.121
    Edge: Not Found
    Firefox: 81.0
    Safari: 14.0
  npmGlobalPackages:
    @vue/cli: 4.5.4
```

* Nous allons créer notre premier projet avec **Vue CLI**. Depuis la racine du dossier _vuejs-spa-tutorial-exercice2_, saisir la ligne de commande suivante pour créer le projet _vie-app_. Une série de questions vous sera posée.

```console
vue create vie-app
```

* Sélectionner le dernier élément afin de choisir manuellement le paramétrage.

```console
Vue CLI v4.5.6
? Please pick a preset:
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
❯ Manually select features
````

* Sélectionner les plugins [Babel](https://babeljs.io/) (un compilateur JavaScript permettant d’utiliser des syntaxes récentes du langage qui seront traduites en JavaScript compréhensible par la plupart des versions des navigateurs) et **Linter / Formatter** (un outil d’analyse statique du code JavaScript permettant de détecter des erreurs avant l’exécution et des problèmes de style).

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
 ◉ Choose Vue version
 ◉ Babel
 ◯ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◯ Router
 ◯ Vuex
❯◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
 ```

* Sélectionner la version 2.x puisque la version 3.x à l'écriture de ce tutoriel n'était pas encore disponible en version finale.

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Linter
? Choose a version of Vue.js that you want to start the project with
❯ 2.x
  3.x (Preview)
```

* Pour l’option **Linter / Formatter**, choisir le premier élément afin d’afficher la moindre erreur détectée. C’est assez contraignant au début, mais quel plaisir d’avoir un code propre qui respecte les conventions de codage. Le **Linter** utilisé par défaut sera [ESLint](https://eslint.org/).

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Pick a linter / formatter config:
❯ ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
```

* Choisir le premier élément pour lancer le **Linter** à chaque sauvegarde d’un fichier JavaScript.

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Pick a linter / formatter config: Basic
? Pick additional lint features:
❯◉ Lint on save
 ◯ Lint and fix on commit
```

* Choisir le second élément pour stocker les informations spécifiques de [Babel](https://babeljs.io/) et [ESLint](https://eslint.org/) dans le fichier _package.json_. À noter que même avec ce choix, un fichier _babel.config.js_ sera quand même créé.

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.?
  In dedicated config files
❯ In package.json
```

* Choisir de sauvegarder ou pas, si vous souhaitez que vos précédents choix soient considérés par défaut pour les prochaines créations de projets.

```console
Vue CLI v4.5.6
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Linter
? Choose a version of Vue.js that you want to start the project with 2.x
? Pick a linter / formatter config: Basic
? Pick additional lint features: Lint on save
? Where do you prefer placing config for Babel, ESLint, etc.? In package.json
? Save this as a preset for future projects? (y/N)
```

La création de votre projet va se dérouler, veuillez patienter que les modules NPM soient téléchargés.

```console
Vue CLI v4.5.6
✨  Creating project in /Users/baronm/workspacepersowebsite/vuejs-spa-tutorial/vuejs-spa-tutorial-exercice2/vie-app.
⚙️  Installing CLI plugins. This might take a while...

⸨ ░░░░░░░░░░░░░░░░░⸩ ⠇ fetchMetadata: sill pacote range manifest for unique-filename@^1.1.1 fetched in 43ms
```

* Les fichiers générés correspondent à une application minimaliste *HelloWorld*. Examiner les fichiers générés dans le répertoire _vi-app_.

```console
vie-app
├── README.md
├── babel.config.js
├── node_modules/
├── package-lock.json
├── package.json
├── public/
│   ├── favicon.ico
│   └── index.html
└── src/
    ├── App.vue
    ├── assets
    │   └── logo.png
    ├── components
    │   └── HelloWorld.vue
    └── main.js
```

Le fichier _README.md_ décrit les différentes commandes à utiliser avec l'outil **npm**. 

Le fichier _babel.config.js_ est un fichier de configuration pour le transpileur [Babel](https://babeljs.io/). Ce dernier permet de générer du code JavaScript exécutable sur n’importe quel navigateur web. L’avantage est de pouvoir utiliser des versions récentes de JavaScript comme par exemple ES2015+.

Le fichier _package.json_ est le fichier de configuration de votre projet. Ce fichier de configuration contient de métadonnées pour décrire le projet : `name` et `version`. Il contient également les dépendances vers les bibliothèques utilisées par le projet.

Le répertoire _node_modules_ contient l’ensemble des modules nécessaires pour la construction du projet. Ce répertoire est obtenu automatiquement en exécutant le script `$ npm install`. L’outil **npm** se base alors sur le fichier _package.json_ pour télécharger les modules directs et transitifs. Par comparaison, c’est très ressemblant à Maven de l’univers Java où _pom.xml_ correspond au fichier _package.json_.

Le répertoire _public_ est utilisé pour stocker les fichiers statiques HTML. Le fichier _index.html_ est le point d’entrée de votre application. Tout le code que vous allez développer sera injecté dans `<div id="app"></div>`. Vous ne devriez pas trop intervenir dans la modification de ce fichier excepté pour enrichir le contenu de la balise `<head>` (voir demande ci-dessous). 

* Éditer le fichier _index.html_ et ajouter dans la balise `<head>`, la bibliothèque CSS [Boostrap](https://getbootstrap.com/).

```html
<head>  
  ...
  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
</head>
```

Le fichier *src/main.js* sert à configurer notre projet en permettant d'initialiser des variables globales et de préciser où le rendu doit être effectué (`$mount('#app'))`).

Le fichier *src/App.vue* est le premier composant de votre application qui va contenir tous les autres composants. Il est en quelque sorte le composant racine d’une application de type Single-Page application (SPA).

Le répertoire _src/assets_ contient toutes les ressources de votre projet (images, vidéos et fichiers à télécharger).

Le répertoire _src/components_ contient tous les composants que vous allez développer. Tous les fichiers porteront l’extension _*.vue_. Actuellement, seul un composant est disponible appelé *HelloWorld*.

* Toujours depuis le terminal, saisir la commande suivante pour tester l'application *HelloWorld*.

```console
$ npm run serve

 DONE  Compiled successfully in 1044ms

  App running at:
  - Local:   http://localhost:8080/
  - Network: unavailable

  Note that the development build is not optimized.
  To create a production build, run npm run build.
```

* Ouvrir un navigateur web à l'adresse http://localhost:8080 pour visualiser le résultat de l'exécution.

![Application HelloWorld](./images/helloworld.png "Application HelloWorld")

Avant de démarrer le développement, nous allons supprimer tout le code inutile généré par l'outil **Vue CLI** (composant *HelloWorld*).

* Stopper l'exécution, supprimer le fichier _src/components/HelloWorld.vue_ et remplacer le contenu du fichier _App.vue_ par le code ci-dessous.

```html
<template>
  <div class="container-fluid" id="app"></div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
</style>
```

Nous allons maintenant développer la partie graphique des composants [Vue.js](https://vuejs.org/) à partir de la maquette fournie dans le répertoire _htmldesign/_. Il vous sera donc demandé de copier/coller le code HTML dans le corps de la balise `<template>` de chaque composant. À cette étape, il n'y aura pas de comportement. Nous souhaitons reproduire le résultat fourni par maquette avec une approche par composants.

* Créer un nouveau fichier _MenuBar.vue_ dans le répertoire _src/components_ et y copier le code HTML de la barre de navigation (code disponible dans les trois fichiers HTML du répertoire _htmldesign/_). Le résultat est montré dans le code ci-dessous.

```html
<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
    <span class="navbar-brand">VIE-UI</span>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Import</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Export</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "MenuBar",
};
</script>
```

* Sur le même principe que le fichier _MenuBar.vue_, créer dans le répertoire _src/components_ les fichiers _Common.vue_, _Export.vue_, _Import.vue_, _VirtualMachine.vue_ et _VirtualMachineElement.vue_ correspondant aux composants restants à développer.

Si vous testez l'application, il n'y aura aucun affichage car nous n'avons pas encore instancié les composants, il s'agit de l'objectif de l'exercice suivant.