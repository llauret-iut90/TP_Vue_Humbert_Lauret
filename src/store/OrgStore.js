import Vue from 'vue'
import Vuex from 'vuex'

import * as orgService from '@/service/org.service';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        orgSecret: '',
        orgList: [],
        currentOrg: {},
    },
    getters: {},
    mutations: {
        setOrgList(state, orgList) {
            state.orgList = orgList;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
        }
    },
    actions: {
        async fetchOrgs({commit}) {
            const res = await orgService.getOrganizations();
            if (res.error === 0) {
                commit('setOrgList', res.data);
            }
            return res;
        },
        async fetchOrgById({state}, _id) {
            console.log('fetchOrgById', _id);
            const res = await orgService.getOrganizationById(_id, state.orgSecret);
            console.log('fetchOrgById', res);
            if (res.error === 0) {
                state.currentOrg = res.data;
                console.log('currentOrg', state.currentOrg);
            }
            return res;
        },
        async createOrg({dispatch}, {name, secret}) {
            const res = await orgService.createOrganization(name, secret);
            if (res.error === 0) {
                dispatch('fetchOrgs');
            }
            return res;
        },
    },
    modules: {}
})

