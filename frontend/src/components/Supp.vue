<template>
  <div id="supp">

    <div>
      <Navigation />
    </div>

    <div>
      <h2>Supprimer votre article du forum et de la base de données</h2>
        <h3>Cette action est irréversible</h3>
     
        <button type="button" class="btn btn-danger ml-5" @click="suppArticle()">Supprimer</button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import Navigation from "@/components/Navigation.vue";

export default {
  name: "Supp",

   components: {
    Navigation
  },

  methods: {
    
    suppArticle() {
      const token = localStorage.getItem("token");
      const idPost = this.$route.params.id;
      axios.delete('http://localhost:3000/api/post/delete/' + idPost, {
          headers: { Authorization: "bearer " + token, },
        })
        .then((res) => {
          if (res) { this.$router.push("/AllPost");}
        })
        .catch((e) => { console.log(e); });
    },
  }
}
</script>

<style scoped>
#supp {
  text-align: center;
}
h2 {
  padding: 20px;
}
.modification {
  margin-top: 45px;
  margin-bottom: 125px;
}
.btn-danger {
  background-color: #091f43 !important;
  color:#fff !important;
  font-weight: 700;
}
.erreur {
  color: #fd2d01;
}

</style>

