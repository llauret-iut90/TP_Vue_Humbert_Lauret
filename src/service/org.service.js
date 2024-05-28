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

async function addTeam(id_Team, org_secret) {
    let data = {
        idTeam: id_Team
    }
    console.log("DATA", data)
    console.log("ORG SECRET", org_secret)
    return await patchRequest(`/orgs/addteam`, data, "addTeam", {"org-secret": org_secret});
}

async function removeTeam(id_Team, org_secret) {
    let data = {
        id_Team: id_Team
    }
    return await patchRequest(`/orgs/removeteam?org-secret=${org_secret}`, data, "removeTeam");
}

async function getOrganizationById(_id, org_secret) {
    return await getRequest(`/orgs/getbyid/${_id}`, "getOrganizationById", {"org-secret": org_secret});
}

export {
    getOrganizations,
    createOrganization,
    addTeam,
    removeTeam,
    getOrganizationById
}