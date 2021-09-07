<template>


  <div class="compte">

    <div>
      <Navigation />
    </div>

    <h2>Mon compte</h2>
  
    <div>
      <div v-for="(user,indexU) in users" :key="indexU">
        <div class="card card-product mx-auto">
          <div class="card-body product-body">
            <h3 class="card-title nom">{{user.username}}</h3>
            </div>
            
            <button class="btn btn-danger mt-2" v-if="userId == user.id || admin == 1" @click="deleteUser()">Supprimer mon compte</button>
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
/*directive v-for , récupérons des données d’une API par exemple afficher chaque item récupéré
 pour une identification unique, nous devons utiliser la propriété :key 
partie modèle (localisée dans le contenu de la balise script
La partie modèle est définie dans la fonction data() qui retourne un ensemble de propriétés
ajouter le code JavaScript correspondant aux méthodes du modèle
le mot clé this: a une portée globale et fait référence au modèle du composant
désigneriez des propriétés  data  dans des valeurs calculées en les préfixant avec this
$ en + des propriétés de données, il y a des méthodes et propriétés utiles et sont préfixées par $
pour les différencier des propriétés de data
hooks de cycle de vie appelés à différentes étapes de cycle de vie d'une instance
comme mounted et sont appelés avec leur this pointant sur l'instance de vue qui les invoque*/

import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "user",

 components: {
    Navigation
  },

  data() {
    return {
      users: [],
      userId: "",
      isAdmin: 0,
    };
  },
 
  mounted: function() {
    this.getOneUser();
    const token = localStorage.getItem("token");

    if(token)
    {
      this.userId = VueJwtDecode.decode(token).userId;
      this.admin = VueJwtDecode.decode(token).isAdmin;
    }
  },
  methods: {
    getOneUser() {
      const token = localStorage.getItem("token");
      const iduser = this.$route.params.id;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }
      axios.get('http://localhost:3000/api/auth/user/' + iduser, {
          headers: { Authorization: "bearer " + token,},
        })
        .then((res) => { this.users = res.data;})
        .catch((e) => { console.log(e); });
    },

    deleteUser() {
      const token = localStorage.getItem("token");
      const idUser = this.$route.params.id;
      axios.delete('http://localhost:3000/api/auth/delete/' + idUser, {
          headers: { "Content-Type": "application/json", Authorization: "bearer " + token, },
        })
        .then((res) => {
          if (res) {
            localStorage.clear();
            this.$router.push("/Signup");
          }
        })
        .catch((e) => { console.log(e); });
    },

    
    
  },
};
</script>

<style scoped>
.compte{
  padding-bottom: 100px
}
h2 {
  text-align: center;
  font-size: 25px;
  color: #091f43;
}
.card {
  background-color: #091f43;
  margin-bottom: 35px;
}
.card-product {
  display: flex;
  align-items: center;
  border-radius: 22px 22px;
  width: 50%;
}
.nom {
  color: #fff;
}
.form-group {
  color: #fff;
}
.btn-danger {
  background-color: #fd2d01 !important;
  color:#06142b !important;
  font-weight: 700;
}
.erreur {
  color: #d1515a;
}
@media (min-width: 320px) and (max-width: 1600px) {
  .card-product {
    margin: 80px auto auto auto;
    flex-direction: column;
    border-radius: 22px 22px;
    width: 80%;
  }
}
</style>