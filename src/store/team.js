import * as teamService from '@/service/team.service';

export default {
    state: () => ({
        teamList: [],
        currentTeam: {},
    }),
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
        async createTeam({dispatch}, name) {
            const res = await teamService.createTeam({name: name});
            if (res.error === 0) {
                dispatch('fetchTeams');
            }
            return res;
        }
    },
}
