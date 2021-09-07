<template>
  <div id="signup">

    <h2>Inscription</h2>
    
    <form class="px-4 py-3 formulaire">

      <div class="form-group">
        <label for="email">Courriel</label>
        <input type="email" class="form-control" v-model="email" id="email" placeholder="groupo@exemple.com" required /><br>
        <span class="erreur" v-if="(!$v.email.required && $v.email.$dirty)">Veuillez indiquer un courriel valide</span>
      </div>

      <div class="form-group">
        <label for="username">Pseudo</label>
        <input type="text" class="form-control" id="username" v-model="username" name="username" placeholder="Nom et Prénom" required /><br>
        <span class="erreur" v-if="(!$v.username.required && $v.username.$dirty)">Veuillez indiquer votre nom et prénom </span>
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" v-model="password" id="password" required /><br>
        <span class="erreur" v-if="(!$v.password.required && $v.password.$dirty )">Mot de passe requis: 8 caractères minimun, au moins 1 Majuscule, 1 minuscule, 1 chiffre et sans espace</span>
        <span class="erreur" v-if="(!$v.password.valid && !$v.password.minLength )">Mot de passe requis: 8 caractères minimun, au moins 1 Majuscule, 1 minuscule, 1 chiffre et sans espace</span>
      </div>

      <button type="button" class="btn btn-danger" @click="createUser()">Inscription</button>
     
    </form>
  </div>

</template>

<script>
import axios from "axios";
import {required, email, minLength, maxLength,} from "vuelidate/lib/validators";

export default {
/*La directive v-if
 utilisée pour conditionnellement faire le rendu d’un bloc.
 La directive  v-on  est couramment utilisée avec «  @  ».
 Au lieu d'écrire v-on:click="alert('Bonjour')", on écrit @click="alert('Bonjour')".
Le rendu du bloc sera effectué uniquement si l’expression de la directive retourne une valeur évaluée à vrai.

v-model permet de définir la propriété  data à mettre à jour lorsque l'utilisateur interagit avec un formulaire.
vuelidate  v-model
ne pas modifier directement votre modèle, vous pouvez toujours utiliser des liaisons :input et @event distinctes.
utile si vous utilisez des données provenant de sources externes, comme les accessoires.
vous occuper manuellement de la définition de la $dirty en appelant la méthode $touch() le cas échéant. */

  name: "SignUp",
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  validations: {
    email: { required, email, },
    username: { required, },
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
    createUser() {
      this.submited = true;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const username = document.querySelector("#username").value;
        let users = {
          email: email,
          password: password,
          username: username,
        };
        // Vérifier que les champs du formulaire soient bien remplis
        if (users.email == "" || users.password == "" || users.username == "") {
          users = { userVerification: false, };
        } 
        // Envoie des données au backend pour la création de l'utilisateur
        axios.post('http://localhost:3000/api/auth/signup', users)
          .then((res) => {
            console.log(res);
            this.$router.push("/Login");
          })
          .catch((e) => { console.log(e); });
      }
    },
  },
};
</script>
<style scoped>
#signup{
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