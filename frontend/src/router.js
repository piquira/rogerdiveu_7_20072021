import Vue from 'vue';
import VueRouter from 'vue-router';
import Accueil from './components/Accueil.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import User from './components/User.vue';
import AllPost from './components/AllPost.vue';
import Poster from './components/Poster.vue';
import OnePost from './components/OnePost.vue';
import Supp from './components/Supp.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Signup',
        name: 'Signup',
        component: SignUp
    }, {
        path: '/user/:id',
        name: 'user',
        component: User
    },
    {
        path: '/AllPost',
        name: 'AllPost',
        component: AllPost
    },
    {
        path: '/Poster',
        name: 'Poster',
        component: Poster
    },
    {
        path: '/post/:id',
        name: 'OnePost',
        component: OnePost
    },
    {
        path: '/supp/:id',
        name: 'supp',
        component: Supp
    }
];

const router = new VueRouter({
    routes
});

export default router;