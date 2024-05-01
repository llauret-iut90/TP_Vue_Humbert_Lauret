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
    },
}
