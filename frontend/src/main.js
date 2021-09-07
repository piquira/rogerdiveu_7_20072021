/*Le fichier main.js sert à configurer notre projet. Il précise les composants à utiliser (import App from './App.vue')
initialiser des variables globales (Vue.config.productionTip = false)
précise où le rendu doit être effectué ($mount('#app'))).
Ce fichier est le point central de l'application.*/

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Vuelidate from 'vuelidate';
import VueJwtDecode from "vue-jwt-decode";

Vue.config.productionTip = false;

Vue.use(Vuelidate);

new Vue({
    router,
    render: h => h(App),
    data: () => {
        return {
            isLogged: false,
            usersId: 0
        }
    },
    mounted: function()
    {        
        this.connexion();
    },
    methods: {
        connexion: function()
        {
            let value = 0;

            try {
                value = VueJwtDecode.decode(localStorage.getItem("token"))?.userId ?? 0;
            }
            catch(e)
            {

            }

            this.usersId = value;
        },
        deconnexion: function()
        {
            this.usersId = 0;
        }
    }
}).$mount('#app');
