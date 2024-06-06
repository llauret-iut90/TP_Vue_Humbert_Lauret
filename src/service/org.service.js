import {getRequest, patchRequest, postRequest} from "@/service/axios.service";

async function getOrganizations() {
    return await getRequest("/orgs/get", "getOrganizations");
}

async function createOrganization(name, secret) {
    let data = {
        name: name, secret: secret
    }
    return await postRequest("/orgs/create", data, "createOrganization");
}

async function addTeam(id_Team) {
    let data = {
        idTeam: id_Team
    }
    console.log("DATA", data)
    return await patchRequest(`/orgs/addteam`, data, "addTeam");
}

async function removeTeam(id_Team) {
    let data = {
        idTeam: id_Team
    }
    return await patchRequest(`/orgs/removeteam/`, data, "removeTeam");
}

async function getOrganizationById(_id) {
    return await getRequest(`/orgs/getbyid/${_id}`, "getOrganizationById");
}

export {
    getOrganizations, createOrganization, addTeam, removeTeam, getOrganizationById
}