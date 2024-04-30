import Vue from 'vue'
import Vuex from 'vuex'

import * as teamService from '@/service/team.service';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        teamList: [],
        currentTeam: {},
    },
    getters: {},
    mutations: {
        setTeamList(state, teamList) {
            state.teamList = teamList;
        }
    },
    actions: {
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
        }
    },
    modules: {}
})