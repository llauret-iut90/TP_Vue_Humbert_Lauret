import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/auth',
        name: 'orgauth',
        component: () => import('../views/OrgAuthView.vue'),
    },
    {
        path: '/orgList',
        name: 'orgList',
        component: () => import('../views/OrgListView.vue'),
    },
    {
        path: '/org/:orgId',
        name: 'org',
        component: () => import('../views/OrgView.vue'),
    },
    {
        path: '/teamList',
        name: 'teamList',
        component: () => import('../views/TeamListView.vue'),
        // OrgView and TeamListView will render a same component
    },
    {
        path: '/team',
        name: 'team',
        component: () => import('../views/TeamView.vue'),
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
