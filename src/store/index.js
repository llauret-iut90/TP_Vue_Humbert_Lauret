import Vue from 'vue'
import Vuex from 'vuex'

import orgStore from './org'
import teamStore from './team'
import heroStore from './hero'
import notifStore from './notif'
import authStore from './auth'
import userStore from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        org: orgStore,
        team: teamStore,
        hero: heroStore,
        notif: notifStore,
        auth: authStore,
        user: userStore,
    }
})
