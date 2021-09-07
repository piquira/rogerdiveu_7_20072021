<template>

  <main id="CreatePost">

      <div>
        <Navigation />
      </div>

    <div class="mx-auto">
      <h2>A vos plumes</h2>
      
      <form class="px-4 py-3 Post" id="formpost">

        <div class="form-group">
          <label for="title">Titre</label>
          <input type="text" class="form-control" id="title" v-model="title" required /><br>
          <span class="erreur" v-if="(!$v.title.required && $v.title.$dirty)">Indiquer un titre</span>
        </div>

        <div class="form-group">
          <label for="content">Texte</label>
          <textarea class="form-control textarea" v-model="content" rows="5" id="content" required></textarea>
        </div>

        <div class="form-group">
          <label class="sr-only" for="image" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg" v-on:change="select" ref="file" id="image" />
        </div>

        <span class="erreur" v-if="(!$v.content.required && $v.content.$dirty)">Indiquer votre texte</span><br><br>
  
        <button type="button" class="btn btn-danger" @click="PostArticle()">Publier</button>
      </form>
    </div>
  </main>

</template>

<script>
/*La directive v-if utilisée pour condition faire le rendu d’un bloc.si sinon si
Le rendu du bloc sera effectué uniquement si l’expression de la directive retourne une valeur évaluée à vrai.
 La directive  v-on  écouter certains événements sur un élément
 Au lieu d'écrire v-on:click="alert('Bonjour')", on écrit @click="alert('Bonjour')". click (argument)
Au lieu de lier directement la méthode par son nom dans l’attribut, nous pouvons également utiliser des méthodes dans une instruction
v-model permet de définir la propriété  data à mettre à jour lorsque l'utilisateur interagit avec un formulaire.
Les méthodes vous permettent de définir des fonctions auxquelles votre application Vue aura accès
vous désigneriez des propriétés  data  dans des valeurs calculées en les préfixant avec  this
vuelidate  v-model
ne pas modifier directement votre modèle, vous pouvez toujours utiliser des liaisons :input et @event distinctes.
utile si vous utilisez des données provenant de sources externes, comme les accessoires.
vous occuper manuellement de la définition de la $dirty en appelant la méthode $touch() le cas échéant.

La méthode append() de l'interface FormData ajoute une nouvelle valeur à une clé existante dans un objet FormData,
ou rajoute cette clé et cette valeur quand elle n'existe pas.*/


import axios from "axios";
import { required } from "vuelidate/lib/validators";
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Poster",

 components: {
    Navigation
  },

  data() {
    return {
      title: "",
      file: "",
      content: "",
    };
  },
  validations: {
    title: { required,},
    content: { required,},
  },
  methods: {
    select() { this.file = this.$refs.file.files[0]; },
    PostArticle() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const token = localStorage.getItem("token");
        const userId = VueJwtDecode.decode( localStorage.getItem("token") ).userId;
        const title = document.querySelector("#title").value;
        const content = document.querySelector("#content").value;
        const formData = new FormData();
        formData.append("image", this.file);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("user_id", userId);

        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
          axios.defaults.headers.common["Authorization"] = null;
          this.$router.push("/");
        }

        axios.post('http://localhost:3000/api/post/create', formData, {
            headers: { Authorization: "bearer " + token, },
          })
          .then((res) => {
            if (res) {
              this.$router.push("/AllPost");
            }
          })
          .catch((e) => { console.log(e); });
      }
    },
  },
};
</script>

<style scoped>

h2 {
  text-align: center;
  font-size: 30px;
}

.btn-danger {
  background-color: #fd2d01 !important;
  color:#06142b !important;
  font-weight: 700;
}
.erreur {
  color: #d1515a;
}
</style>