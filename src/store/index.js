import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        org_secret: '',
        heroesAliases: [],
        currentHero: {},
        teamList: [],
        currentTeam: {},
        orgNameList: [],
        currentOrg: {},
    },
    getters: {},
    mutations: {
        setOrgSecret(state, secret) {
            state.org_secret = secret;
        },
        setHeroesAliases(state, aliases) {
            state.heroesAliases = aliases;
        },
        setCurrentHero(state, hero) {
            state.currentHero = hero;
        },
        setTeamList(state, teamList) {
            state.teamList = teamList;
        },
        setCurrentTeam(state, team) {
            state.currentTeam = team;
        },
        setOrgNameList(state, orgNameList) {
            state.orgNameList = orgNameList;
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org;
        }
    },
    actions: {
        setOrgSecret({commit}, secret) {
            commit('setOrgSecret', secret);
        },
        setHeroesAliases({commit}, aliases) {
            commit('setHeroesAliases', aliases);
        },
        setCurrentHero({commit}, hero) {
            commit('setCurrentHero', hero);
        },
        setTeamList({commit}, teamList) {
            commit('setTeamList', teamList);
        },
        setCurrentTeam({commit}, team) {
            commit('setCurrentTeam', team);
        },
        setOrgNameList({commit}, orgNameList) {
            commit('setOrgNameList', orgNameList);
        },
        setCurrentOrg({commit}, org) {
            commit('setCurrentOrg', org);
        }
    },
    modules: {}
})
