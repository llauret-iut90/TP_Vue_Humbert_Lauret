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
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team;
        },
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
        },
        setCurrentTeamFromId({state, commit}, teamId) {
            const team = state.teamList.find(team => team._id === teamId);
            commit('setCurrentTeam', team);
        },
    },
}
