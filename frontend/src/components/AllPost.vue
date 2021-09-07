<template>
  <div class="allpost">

    <div>
        <Navigation />
      </div>

    <div :id="article.id" v-for="(article,indexA) in articles" :key="indexA">

      <div class="card card-product mx-auto">
        <div class="card-body product-body">
          <h2 class="card-title">{{ article.title }}</h2>
            <div class="dropdown-divider separation"></div>
              <p class="card-text">{{ article.content}}</p>
                <div>
                  <img class="card-img-top product-img" :alt="article.id" :src="article.image" v-if="article.image != 0" />
                </div>
            <div class="dropdown-divider separation"></div>
              <ul class="navbar-nav mt-2 flex-row">
                <li class="nav-item"> Auteur:
                    <span> {{article.username}} -</span>
                </li> 
                <li class="nav-item">- Le:
                    <span>{{ dateArticle(article.dateCreate)}}</span>
                </li>
              </ul>
          <router-link class="btn btn-danger mt-3" :to="`/post/${article.id}`">Commentaire ou suppression</router-link>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
/* v-for directive, récupérons des données d’une API par exemple afficher chaque item récupéré
on récupére article dans articles et la clé est indexA
expliquer à Vue comment suivre l’identité de chaque nœud, afin que les éléments existants puissent être réutilisés
et réordonnés
fournir un attribut unique key pour chaque élément
v-if directive, rendu conditionnel standard  if/then  de JavaScript
 */


import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "AllPost",

 components: {
    Navigation
  },

  data() {
    return {
      articles: [],
      imgoff: 0,
      usersid: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      isAdmin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  mounted() {
    this.getAllPost();
  },
  methods: {
    async getAllPost() {
      const token = localStorage.getItem("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios.get('http://localhost:3000/api/post/', {
          headers: { Authorization: "bearer " + token, },
        })
        .then((res) => { this.articles = res.data; })
        .catch((error) => { console.log(error); });
    },
    dateArticle(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-Fr", options);
    },
  },

};
</script>

<style scoped>

.card {
  background-color: #091f43;
  margin-bottom: 35px;
  color: #fff;
}
.card-product {
  display: flex;
  border-radius: 25px 25px;
  width: 50%;
  color: #fff;
}
.product-img {
  object-fit: contain;
}
.btn-danger {
  background-color: #fd2d01 !important;
  color:#06142b !important;
  font-weight: 700;
}

@media (min-width: 300px) and (max-width: 980px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 25px 25px;
    width: 80%;
  }
  .product-img {
    width: 50%;
    object-fit: contain;
  }
}
</style>


