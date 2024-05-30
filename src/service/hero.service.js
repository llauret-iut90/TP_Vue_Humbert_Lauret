import {getRequest} from "@/service/axios.service.js";
import {postRequest} from "@/service/axios.service.js";
import {putRequest} from "@/service/axios.service.js";

async function getAliases() {
    return await getRequest("/heroes/getaliases", "getAliases");
}

async function createHero(publicName, realName, powers) {
    let data = {
        publicName: publicName, realName: realName, powers: powers
    }
    return await postRequest("/heroes/create", data, "createHero");
}

async function updateHero(_id, publicName, realName, powers, org_secret) {
    let data = {
        _id: _id, publicName: publicName, realName: realName, powers: powers,
    }
    return await putRequest(`/heroes/update`, data, "updateHero", {"org-secret": org_secret});
}

async function getHeroById(_id, org_secret) {
    return await getRequest(`/heroes/getbyid/${_id}`, "getHeroById", {"org-secret": org_secret});
}

export {
    getAliases,
    createHero,
    updateHero,
    getHeroById
}