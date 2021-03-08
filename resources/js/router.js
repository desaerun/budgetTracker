import Router from 'vue-router'
import goTo from 'vuetify/es5/services/goto'

import store from "./store";

//VueRouter routes
import Welcome from "./components/Welcome";
import Dashboard from './components/Dashboard'
import BillsIndex from './components/bills/BillsIndex'
import IncomeIndex from './components/income/IncomeIndex'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import Register from "./components/auth/Register";
import Page from "./components/edittable/Page";


const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome,
    },
    {
        path: '/page',
        name: 'page',
        component: Page,
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/bills',
        name: 'bills',
        component: BillsIndex,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/income',
        name: 'income',
        component: IncomeIndex,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            requiresGuest: true,
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            requiresGuest: true
        },
    },
];
let router = new Router({
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0;

        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y
        }

        return goTo(scrollTo)
    },
    mode: 'history',
    routes: routes
});
router.beforeEach((to,from,next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next ({
                name: 'login',
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
        if (store.getters.loggedIn) {
            next ({
                name: 'dashboard'
            });
        } else {
            next();
        }
    } else {
        next();
    }
})

export default router;
