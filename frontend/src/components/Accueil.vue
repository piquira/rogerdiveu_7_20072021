<template>
  <div class="accueil">

    <nav class=" navbar-expand ">
        <ul class="navbar-nav col-lg-12 col-sm-12">
          <li class="nav-item">
          <router-link to="/SignUp" class="nav-link btn btn-danger">Inscription</router-link>
          </li>
          <li class="nav-item">
          <router-link to="/login" class="nav-link btn btn-danger" >Se connecter</router-link>
          </li>
        </ul>
    </nav>

  </div>
</template>

<script>
/*
partie modèle (localisée dans le contenu de la balise script
La partie modèle est définie dans la fonction data() qui retourne un ensemble de propriétés
partie modèle (localisée dans le contenu de la balise script

<router-link></router-link>  - similaire à la balise  anchor  en HTML, ce composant permet également la navigation
de l'utilisateur dans l'appli. il est privilégié par rapport à l'utilisation d'une balise d'ancrage normal
il dispose de fonctionnalités intégrées, comme le fait qu'il évite de recharger systématiquement la page.

*/
export default {
  name: "Accueil",
  
  mounted: function()
  {
    console.log(this);
  },
  computed: {
    usersid: function()
    {
      return this.$root.usersId;
    }
  },
  methods: {
    Deconnexion: function() {
      localStorage.clear();
      this.$router.push("/");
      this.$root.deconnexion();
    },
  },
};
</script>

<style scoped>
/*scoped  au bloc de style, afin que le CSS ne s'applique qu'aux éléments du composant courant
cela n'empêchera pas les styles plus spécifiques de prendre le dessus*/
.navbar-nav{
padding-top:40px;
}
.navbar-expand {
  margin-top: 1rem !important;
  margin-bottom: 5rem !important;
  display:flex !important;
}
#nav {
  padding: 0px;
}
#nav a {
  font-weight: bold;
  color: #091f43;
}
#nav a.router-link-exact-active {
  color: #fd2d01;
}

.btn {
  background-color: #091f43 !important;
  border-color:#fff !important;
  margin-left:20px !important;
  font-weight: 600;
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

@media (min-width: 900px) {
.btn {
  margin-bottom:20px !important;
}
.logo {
  width: 80% !important;
  margin: 0;
}
}

@media (max-width: 727px) {
.navbar-nav {
  display: flex !important;
  flex-wrap: wrap;
  flex-direction: column ;
}
.btn {
  margin-bottom: 20px !important;
}
}

</style>
