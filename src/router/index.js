import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/auth', name: 'orgauth', component: () => import('../views/OrgAuthView.vue'), meta: {levelAuth: 0}
}, {
    path: '/orgList', name: 'orgList', component: () => import('../views/OrgListView.vue'), meta: {levelAuth: 0}
}, {
    path: '/org', name: 'org', component: () => import('../views/OrgView.vue'), meta: {levelAuth: 1}
}, {
    path: '/teamList', name: 'teamList', component: () => import('../views/TeamListView.vue'), meta: {levelAuth: 0}
}, {
    path: '/team', name: 'team', component: () => import('../views/TeamView.vue'), meta: {levelAuth: 1}
}, {
    path: '*', name: 'error404',
},]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})


function checkAccess(to) {
    // si la route n'a pas de niveau d'authentification, on laisse passer
    if (to.meta.levelAuth === 0) {
        return true
    } else {
        // si la route a un niveau d'authentification, on vérifie si org-secret est pas vide
        return localStorage.getItem('orgSecret') !== null && localStorage.getItem('orgSecret') !== ''
    }
}

router.beforeEach((to, from, next) => {
    if (to.name === 'error404') {
        next({name: 'orgList'})
    } else {
        if (checkAccess(to)) {
            next()
        } else {
            next({name: 'orgauth'})
        }
    }
})

export default router
