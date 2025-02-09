import {getRequest, postRequest, putRequest} from "@/service/axios.service.js";

async function getAliases() {
    return await getRequest("/heroes/getaliases", "getAliases");
}

async function createHero(publicName, realName, powers) {
    let data = {
        publicName: publicName, realName: realName, powers: powers
    }
    console.log("createHero", data)
    return await postRequest("/heroes/create", data, "createHero");
}

async function updateHero(_id, publicName, realName, powers) {
    let data = {
        _id: _id, publicName: publicName, realName: realName, powers: powers,
    }
    console.log("updateHero", data)
    return await putRequest(`/heroes/update`, data, "updateHero");
}

async function authUpdateHero(_id, publicName, realName, powers) {
    let data = {
        _id: _id, publicName: publicName, realName: realName, powers: powers,
    }
    return await putRequest(`/heroes/authupdate`, data, "authUpdateHero");
}

async function getHeroById(_id) {
    return await getRequest(`/heroes/getbyid/${_id}`, "getHeroById");
}

export {
    getAliases, createHero, updateHero, getHeroById, authUpdateHero
}