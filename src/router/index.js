import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [{

    path: '/auth', name: 'orgauth', component: () => import('../views/OrgAuthView.vue'), meta: {levelAuth: 0}
}, {
    path: '/', name: 'home', component: () => import('../views/HomeView.vue'), meta: {levelAuth: 0}
}, {
    path: '/orgList', name: 'orgList', component: () => import('../views/OrgListView.vue'), meta: {levelAuth: 0}
}, {
    path: '/org', name: 'org', component: () => import('../views/OrgView.vue'), meta: {levelAuth: 1}
}, {
    path: '/teamList', name: 'teamList', component: () => import('../views/TeamListView.vue'), meta: {levelAuth: 1}
}, {
    path: '/team', name: 'team', component: () => import('../views/TeamView.vue'), meta: {levelAuth: 1}
}, {
    path: '*', name: 'error404', component: () => import('../views/ErrorView.vue'), meta: {levelAuth: 0}
}]

const router = new VueRouter({
    mode: 'history', base: process.env.BASE_URL, routes
})

function checkAccess(to, from, next) {
    let orgSecret = store.getters.orgSecret;
    let currentTeam = store.getters.currentTeam;

    if (to.meta.levelAuth === 0) {
        console.log(orgSecret)
        next();
    } else if (orgSecret === '') {
        next({name: 'orgauth'});
    } else if (Object.keys(currentTeam).length === 0 && to.path === '/team') {
        console.log("VOUS NE PASSERAI PAS (si vous n'avez pas de team)")
        next({name: 'org'});
    } else {
        console.log("VOUS NE PASSERAI PAS (si vous n'avez pas de secret)")
        console.log("orgSecret getter value", orgSecret)
        console.log("return value", orgSecret !== '')
        next(orgSecret !== '' ? undefined : {name: 'orgauth'});
    }
}

router.beforeEach(checkAccess);

export default router
