<template>

  <div id="forum">

    <header id="header">
      <img class="logo" alt="logo groupomania" src="../src/assets/icon-left-font.png" />
    </header>

      <div >
        <h1>FORUM</h1>
      </div>

      <div>
        <Accueil />
      </div>
    
  </div>

</template>

<script>

import Accueil from "@/components/Accueil.vue";

export default {
  name: "App",

  data() {
    return {
      db:"",
    }
  },

  components: {
    Accueil
  },
/* fichier App.vue est le premier composant de votre application qui va contenir tous les autres composants. 
Il est le composant racine d'une application de type Single-Page application
partie vue (localisée dans le contenu de la balise template)
router-view définit la zone de la page dans laquelle apparaîtra le composant que nous définissons dans chaque route. 
Il est particulièrement important si vous imbriquez des vues les unes dans les autres  */
};
</script>

<style>

#forum {
  background-color: #d8d8d8 !important;
  color: #091f43;
  text-align: center !important;
  padding-bottom: 100px;
}
#header {
  text-align: center;
}
h1 {
  margin-top: 3rem !important;
  text-align: center;
  font-size: 50px;
  color: #091f43;
}

img {
  width: 40%;
}

@media (min-width: 1024px) {
  .logo {
    width: 30%;
  }
}
</style>
