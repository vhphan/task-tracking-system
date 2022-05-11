import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router';
import Register from "../components/Register.vue";
import Welcome from "../components/Welcome.vue";
import Login from "../components/Login.vue";
import {useMainStore} from "../stores/mainStore";

const base = '/app/tts/';

const routes = [
    {
        path: base,
        name: 'welcome',
        component: Welcome
    },
    {
        path: base + 'home',
        name: 'Home',
        component: () => import('../components/Home.vue')

    },
    {
        path: base + 'settings',
        name: 'Settings',
        component: () => import('../components/Settings.vue')

    },
    {
        path: base + 'users',
        name: 'Users',
        component: () => import('../components/Users.vue')

    }, {
        path: base + 'tasks',
        name: 'Tasks',
        component: () => import('../components/Tasks.vue')

    },
    {
        path: base + "register",
        name: 'Register',
        component: Register,
        props: {}
    },
    {
        path: base + "login",
        name: 'Login',
        component: Login,
        props: {}
    },
]
const router = createRouter({
    base: base,
    history: createWebHistory(),
    mode: 'history',
    routes,
})

router.beforeEach(async (to, from) => {

    const mainStore = useMainStore();
    console.log(mainStore.loggedIn)

    if ((to.name === 'Register' || to.name === 'Login') && !mainStore.loggedIn) {
        return;
    }
    if (!mainStore.loggedIn) {
        return {name: 'Login'}
    }
})

export default router