import Vue from 'vue'
import Vuex from 'vuex'

import * as orgService from '@/service/org.service';
import * as teamService from '@/service/team.service';

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
        setTeamList(state, teamList) {
            state.teamList = teamList;
        },
        setOrgSecret(state, orgSecret) {
            state.orgSecret = orgSecret;
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
        async createOrg({dispatch}, {name, secret}) {
            const res = await orgService.createOrganization(name, secret);
            console.log('createOrg', res);
            if (res.error === 0) {
                dispatch('fetchOrgs');
            }
            return res;
        },

        async fetchOrgById({state}, _id) {
            console.log('fetchOrgById', _id, state.orgSecret);
            const res = await orgService.getOrganizationById(_id, state.orgSecret);
            console.log('fetchOrgById', res);
            console.log('fetchOrgById', res.data[0].name);
            if (res.error === 0) {
                state.currentOrg = res.data[0].name;
                console.log('currentOrg', state.currentOrg);
            }
            return res;
        },

        async fetchTeams({commit}) {
            const res = await teamService.getTeams();
            if (res.error === 0) {
                commit('setTeamList', res.data);
            }
            return res;
        },

        async createTeam({dispatch}, body) {
            const res = await teamService.createTeam(body);
            if (res.error === 0) {
                dispatch('fetchTeams');
            }
            return res;
        },


        /*
        * REMARQUE : il n'existe pas de route permettant de récupérer une équipe en
        * particulier avec ses membres. Pour cela, il faut passer par les routes gérant les organisations,
        * en récupérant une organisation en particulier (cf. getbyid), ce qui permet de récupérer la liste des équipes
        * faisant partie de cette organisation, et pour chaque équipe de connaître les ids de leurs membres.
        * Grâce à ces ids, on peut ensuite récupérer chaque héros un par un.
         */
        // async fetchTeamById({state}, _id) {
        //     const res = await teamService.getTeamById(_id, state.orgSecret);
        //     if (res.error === 0) {
        //         state.currentTeam = res.data;
        //     }
        //     return res;
        // },

    },
    modules: {}
    // faudra mettre ça à la place c'est de la merde la syntaxe pour appeler les méthodes vu que les store sont séparés
// import Vue from 'vue'
// import Vuex from 'vuex'
// import teamStore from "@/store/TeamStore";
// import orgStore from "@/store/OrgStore";
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//     modules: {
//         teamStore,
//         orgStore,
//     }
// })
})

