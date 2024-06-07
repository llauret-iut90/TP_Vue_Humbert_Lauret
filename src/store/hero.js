import * as heroService from '@/service/hero.service';

export default {
    state: () => ({
        heroesAliases: [], currentHero: {}
    }), getters: {
        heroesAliases: state => state.heroesAliases, currentHero: state => state.currentHero,
    }, mutations: {
        setHeroesAliases(state, heroes) {
            state.heroesAliases = heroes;
        }, setCurrentHero(state, hero) {
            state.currentHero = hero;
        }
    }, actions: {
        async fetchHeroes({commit}) {
            const res = await heroService.getAliases();
            if (res.error === 0) {
                commit('setHeroesAliases', res.data);
            }
            return res;
        }, async fetchHeroById({commit, rootState}, _id) {
            //rootState c'est pour accéder aux autres states d'autres store
            const orgSecret = rootState.org.orgSecret;
            console.log("orgSecret", orgSecret)
            const res = await heroService.getHeroById(_id, orgSecret);
            if (res.error === 0) {
                commit('setCurrentHero', res.data[0]);
            }
            return res;
        }, async createHero({dispatch}, {publicName, realName, powers}) {
            const res = await heroService.createHero(publicName, realName, powers);
            if (res.error === 0) {
                console.log("createHero", res)
                dispatch('fetchHeroes');
            }
            return res;
        }, async editHero({dispatch, state, rootState}, {_id, publicName, realName, powers}) {
            const orgSecret = rootState.org.orgSecret;
            const res = await heroService.updateHero(_id, publicName, realName, powers, orgSecret);
            console.log("editHero", res)
            if (res.error === 0) {
                dispatch('fetchHeroById', state.currentHero._id);
            }
            return res;
        }, async authEditHero({dispatch, state, rootState}, {_id, publicName, realName, powers}) {
            const orgSecret = rootState.org.orgSecret;
            const res = await heroService.authUpdateHero(_id, publicName, realName, powers, orgSecret);
            console.log("authEditHero", res)
            if (res.error === 0) {
                dispatch('fetchHeroById', state.currentHero._id);
            }
            return res;
        }
    },
}
