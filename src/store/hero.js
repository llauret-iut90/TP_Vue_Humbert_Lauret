import * as heroService from '@/service/hero.service';

export default {
    state: () => ({
        heroesAliases: [],
        currentHero: {},
    }),
    getters: {},
    mutations: {
        setHeroesAliases(state, heroes) {
            state.heroesAliases = heroes;
        },
        setCurrentHero(state, hero) {
            state.currentHero = hero;
        }
    },
    actions: {
        async fetchHeroes({commit}) {
            const res = await heroService.getAliases();
            if (res.error === 0) {
                commit('setHeroesAliases', res.data);
            }
            return res;
        },
        async fetchHeroById({commit}, _id) {
            const res = await heroService.getHeroById(_id);
            if (res.error === 0) {
                commit('setCurrentHero', res.data[0]);
            }
            return res;
        },
        async createHero({dispatch}, {publicName, realName, powers}) {
            const res = await heroService.createHero(publicName, realName, powers);
            if (res.error === 0) {
                dispatch('fetchHeroes');
            }
            return res;
        },
        async editHero({dispatch, state}, {publicName, realName, powers}) {
            const res = await heroService.updateHero(state.currentHero._id, publicName, realName, powers);
            if (res.error === 0) {
                dispatch('fetchHeroById', state.currentHero._id);
            }
            return res;
        }
    },
}
