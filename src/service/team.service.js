import {getRequest} from "@/service/axios.service";
import {postRequest} from "@/service/axios.service";
import {patchRequest} from "@/service/axios.service";

async function getTeams() {
    return await getRequest("teams/get", "getTeams");
}

async function createTeam(body) {
    return await postRequest("teams/create", body, "createTeam");
}

async function addHeroes(idHeroes, idTeam) {
    let data = {
        idHeroes: idHeroes,
        idTeam: idTeam
    }
    return await patchRequest(`teams/addheroes`, data, "addHeroes");
}

async function removeHeroes(idHeroes, idTeam) {
    let data = {
        idHeroes: idHeroes,
        idTeam: idTeam
    }
    return await patchRequest(`teams/removeheroes`, data, "removeHeroes");
}


export {
    getTeams,
    createTeam,
    addHeroes,
    removeHeroes
}