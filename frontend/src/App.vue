<template>

  <div id="app">

    <header id="header">
      <img class="logo" alt="logo groupomania" src="../src/assets/icon-left-font.png" />
    </header>

        <nav class=" navbar-expand ">
          <ul class="navbar-nav col-lg-12 col-sm-12">
            <li class="nav-item">
              <router-link to="/Accueil" class="nav-link btn btn-danger">Accés Forum</router-link>
            </li>
          </ul>
        </nav>

    <router-view/>
    
  </div>

</template>

<script>



export default {
  name: "App",

  data() {
    return {
      db:"",
    }
  },

 
/* fichier App.vue est le premier composant de votre application qui va contenir tous les autres composants. 
Il est le composant racine d'une application de type Single-Page application
partie vue (localisée dans le contenu de la balise template)
router-view définit la zone de la page dans laquelle apparaîtra le composant que nous définissons dans chaque route. 
Il est particulièrement important si vous imbriquez des vues les unes dans les autres  */
};
</script>

<style>

#app {
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


.btn {
  background-color: #091f43 !important;
  border-color:#fff !important;
  margin-left:20px !important;
  font-weight: 600;
  margin-top: 50px;
}

.btn-danger {
  background-color: #091f43 !important;
  border-color:#fff !important;
}

ul {
  display: flex;
  justify-content: space-between;
  list-style: none;
  font-size: 20px;
  padding-left: 0px;
  text-align: center;
}
li {
  margin: auto ;
  color: white;
}

@media (min-width: 1024px) {
  .logo {
    width: 30%;
  }
}
</style>

