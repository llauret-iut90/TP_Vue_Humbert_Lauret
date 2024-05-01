import Vue from 'vue'
import Vuex from 'vuex'

import orgStore from './org'
import teamStore from './team'
import heroStore from './hero'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        org: orgStore,
        team: teamStore,
        hero: heroStore,
    }
})
