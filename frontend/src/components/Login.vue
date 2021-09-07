<template>

  <div id="Login">
    
    <h2>Connexion</h2>
   
    <form class=" formulaire px-4 py-3 ">
      <div class="form-group">
        <label for="email">Courriel</label>
        <input type="email" class="form-control" v-model="email" id="email" placeholder="pierre@exemple.fr" aria-required="true" required /><br>
        <span class="erreur" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez ajouter un courriel valide</span>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" v-model="password" id="password" aria-required="true" required /><br>
        <span class="erreur" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis: 8 caractères minimun, au moins 1 Majuscule, 1 minuscule, 1 chiffres et sans espace</span>
        <span class="erreur" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis: 8 caractères minimun, au moins 1 Majuscule, 1 minuscule, 1 chiffre et sans espace</span>
      </div>
      <button type="button" class="btn btn-danger" v-on:click="Connect()">Se connecter</button>
    </form>
    <span id="erreur"></span>
   </div>

</template>

<script>

import axios from "axios";
import {required, email, minLength, maxLength} from "vuelidate/lib/validators";

export default {
/*vuelidate  v-model
 ne pas modifier directement votre modèle, vous pouvez toujours utiliser des liaisons :input et @event distinctes.
utile si vous utilisez des données provenant de sources externes, comme les accessoires.
Dirty est une propriété qui indique si les données du formulaire ont été modifiées.
vous occuper manuellement de la définition de la $dirty en appelant la méthode $touch() le cas échéant. 
DATA
stocker les données afin de pouvoir les réutiliser et effectuer des actions pour l'utilisateur.
Dans Vue, ajout d'une propriété « data » qui a comme valeur un objet.
Elle peut accepter n'importe quelle paire clé - valeur classique
*/

  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { required, email,
    },
    password: { required,
      valid: function (value) {
        const majuscule = /[A-Z]/.test(value);
        const minuscule = /[a-z]/.test(value);
        const nombre = /[0-9]/.test(value);

        return majuscule && minuscule && nombre;
      },
      minLength: minLength(8),
      maxLength: maxLength(99),
    },
  },
  methods: {
    Connect() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const user = { email: email, password: password, };

        axios.post('http://localhost:3000/api/auth/login', user, {
            header: {"Content-Type": "application/json",}, 
        })
          .then((res) => {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/AllPost");
            this.$root.connexion();
          })
          .catch((error) => {
            console.log(error);
            document.getElementById("erreur").innerHTML ="Identifiants non valides";});
      } 
    },
  },
};
</script>

<style scoped>

#Login{
     padding-bottom: 100px
}
.formulaire{
  width: 50%;
  margin-left: 25%;
}
.btn-danger {
  background-color: #091f43 !important;
  border-color: #fd2d01 !important;
  color:#fff !important;
  font-weight: 700;
}
.erreur {
  color: #d1515a;
}

</style>