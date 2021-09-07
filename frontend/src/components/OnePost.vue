<template>
  <div class="onepost">

      <div>
        <Navigation />
      </div>

    <h2>Ajouter un commentaire</h2>
    <h3>Supprimer votre article</h3>
    <div class="mx-auto">

      <div v-for="(article,indexA) in articles" :key="indexA">
        <div class="card card-product mx-auto">
          <div class="card-body product-body">
            <h3 class="card-title titre">{{ article.title }}</h3>
              <div class="dropdown-divider separation"></div>

              <p class="card-text titre">{{ article.content}}</p>

                <div>
                  <img class="card-img-top product-img" alt="image de l'article" :src="article.image" v-if="article.image != 0" />
                  <img class="card-img-top product-img" :src="article.image" v-else-if="imgoff" />
                </div>
              <div class="dropdown-divider separation"></div>

                <ul class="navbar-nav mt-2 mt-lg-0 flex-row">
                  <li class="nav-item active">Auteur:
                    <span class="titre">{{ article.username}} -</span>
                  </li>
                  <li class="nav-item">
                    <span class="titre">- Le {{ dateArticle(article.dateCreate)}} </span>
                  </li>
                </ul>
            <router-link class="btn btn-danger mt-5" :to="`/supp/${article.id}`" v-if="userId == article.user_id || admin == 1">Supprimer votre article</router-link>
          </div>

      <div>
        <div class="row justify-content-center">
          <div class="col-md-10">
            <div class="align-items-center mb-3">
              <label for="commentaire" title="commentaire" class="sr-only"></label>
              <input type="text" class="form-control textarea " rows="5" id="commentaire" v-model="comment" placeholder="Votre commentaire..." required>
              <button type="button" class="btn btn-danger" @click="postCommentaire()">Poster</button>
            </div>
              <span class="erreur" v-if="(!$v.comment.required && $v.comment.$dirty)">Erreur</span>

          <div class="card p-3 mt-4" :id="commentaire.id" v-for="(commentaire,indexC) in comments" :key="indexC">
            <div class=" align-items-center">
              <div class=" flex-row align-items-center">
                <span class="auteur">{{commentaire.username}}</span>  
              </div>
            </div>

            <div class="align-items-center px-3 commentaire ">
              <div class=" flex-row align-items-center">
                <span> 
                  <small class="titre">{{commentaire.content}}</small>
                </span> 
              </div>
            </div>

            <div class="mt-2 align-items-center">
              <button class=" btn btn-danger px-4" v-if="userId == commentaire.user_id || admin == 1 " @click="deletecommentaire">Supprimer</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div class="dropdown-divider separation"></div>
  </div>
</div>

</template>

<script>

/* v-for directive, récupérons des données d’une API par exemple afficher chaque item récupéré
v-if directive, rendu conditionnel standard  if/then  de JavaScript
partie modèle (localisée dans le contenu de la balise script
elle est définie dans la fonction data() qui retourne un ensemble de propriétés
elle est localisée dans le contenu de la balise script    */ 

import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "OnePost",

   components: {
    Navigation
  },
 
  data() {
    return {
      comment: "",
      articles: [],
      comments: [],
      imgoff: 0,
      userId: VueJwtDecode.decode(localStorage.getItem("token")).userId,
      admin: VueJwtDecode.decode(localStorage.getItem("token")).isAdmin,
    };
  },
  validations: {
    comment: { required, },
  },
  mounted: function() {
    this.getOnePost();
    this.getAllcomments();

    console.log(VueJwtDecode.decode(localStorage.getItem("token")));
  },
  methods: {
    getOnePost() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        this.$router.push("/");
      }

      axios.get('http://localhost:3000/api/post/' + idPost, {
          headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`,},
        })
        .then((res) => {
          this.articles = res.data;
        })
        .catch((e) => { console.log(e); });
    },

    postCommentaire() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode( localStorage.getItem("token") ).userId;
        const idPost = this.$route.params.id;
        const formcommentaire = {
          user_id: userId,
          content: this.comment,
          post_id: idPost,
        };

        axios.post('http://localhost:3000/api/comment/create', formcommentaire, {
            headers: { "Content-Type": "application/json",
            Authorization: "bearer " + token,
            },
          })
          .then((res) => {
            if (res) {
               this.getAllcomments();
            }
          })
          .catch((e) => { console.log(e); });
      }
    },

    getAllcomments() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;

      axios.get('http://localhost:3000/api/comment/' + idPost, {
          headers: {Authorization: "bearer " + token,},
        })
        .then((res) => {
          this.comments = res.data;
        })
        .catch((e) => { console.log(e); });
    },
    deletecommentaire(event) {
      console.log(event);
      const button = event.target;
      const comment = button.parentNode.parentNode;
      const comment_id = comment.getAttribute("id");
      const token = localStorage.getItem("token");

      axios.delete('http://localhost:3000/api/comment/delete/' + comment_id, {
          headers: {Authorization: "bearer " + token,},
        })
        .then((res) => {
          if (res) {
            this.getAllcomments();
          }
        })
        .catch((e) => { console.log(e); });
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
.onepost{
  padding-bottom: 100px
}
.card {
  background-color: #091f43;
  margin-bottom: 35px;
  color: #fff;
}
.card-product {
  display: flex;
  width: 100%;
  width: 50%;
  color: #fff;
}
.product-img {
  width: 100%;
  object-fit: contain;
}
.titre {
  text-align: center;
  font-size: 20px;
  color: #fff !important;
}
.auteur {
  color: #fff !important;
}
.commentaire {
  font-size: 15px;
}
.btn-danger {
  background-color: #fd2d01 !important;
  color:#06142b !important;
  font-weight: 700;
}
.erreur {
  color: #d1515a;
}

@media (min-width: 320px) and (max-width: 1000px) {
  .card-product {
    margin: 90px auto auto auto;
    flex-direction: column;
    border-radius: 20px 20px;
    width: 80%;
  }
  .product-img {
    width: 100%;
    object-fit: contain;
  }
}
</style>