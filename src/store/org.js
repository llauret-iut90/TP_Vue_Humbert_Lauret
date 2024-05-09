import * as orgService from '@/service/org.service';

export default {
    state: () => ({
        orgSecret: '',
        orgList: [],
        currentOrg: {},
    }),
    getters: {
        orgList: state => state.orgList,
        currentOrg: state => state.currentOrg,
    },
    mutations: {
        setOrgSecret(state, secret) {
            state.orgSecret = secret;
        },
        setOrgList(state, orgList) {
            state.orgList = orgList;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
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
        async createOrg({dispatch}, {name, secret}) {
            const res = await orgService.createOrganization(name, secret);
            if (res.error === 0) {
                dispatch('fetchOrgs');
            }
            return res;
        },
        setOrgSecret({commit}, secret) {
            commit('setOrgSecret', secret);
        },
        async fetchOrgById({commit, state}, _id) {
            const res = await orgService.getOrganizationById(_id, state.orgSecret);
            if (res.error === 0) {
                commit('setCurrentOrg', res.data[0]);
            }
            return res;
        },
        async removeTeam({dispatch, state}, teamId) {
            const res = await orgService.removeTeam(teamId, state.orgSecret);
            if (res.error === 0) {
                dispatch('fetchOrgById', state.currentOrg._id);
            }
            return res;
        },
        async addTeam({dispatch, state}, teamId) {
            const res = await orgService.addTeam(teamId, state.orgSecret);
            if (res.error === 0) {
                dispatch('fetchOrgById', state.currentOrg._id);
            }
            return res;
        },
    },
}
