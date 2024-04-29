import Vue from 'vue'
import Vuex from 'vuex'

import * as orgService from '@/service/org.service';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        orgSecret: '',
        heroesAliases: [],
        currentHero: {},
        teamList: [],
        currentTeam: {},
        orgList: [],
        currentOrg: {},
    },
    getters: {},
    mutations: {
        setOrgList(state, orgList) {
            state.orgList = orgList;
        },
    },
    actions: {
        async fetchOrgs({commit}) {
            const res = await orgService.getOrganizations();
            if (res.error === 0) {
                commit('setOrgList', res.data);
            }
            return res;
        },
        async createOrg({dispatch}, { name, secret }) {
            const res = await orgService.createOrganization(name, secret);
            if (res.error === 0) {
                dispatch('fetchOrgs');
            }
            return res;
        }
    },
    modules: {}
})
