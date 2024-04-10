import {getRequest} from "@/service/axios.service";
import {postRequest} from "@/service/axios.service";
import {patchRequest} from "@/service/axios.service";

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
        id_Team: id_Team
    }
    return await patchRequest(`/orgs/addteam?org-secret=${org_secret}`, data, "addTeam");
}

async function removeTeam(id_Team, org_secret) {
    let data = {
        id_Team: id_Team
    }
    return await patchRequest(`/orgs/removeteam?org-secret=${org_secret}`, data, "removeTeam");
}

async function getOrganizationById(_id, org_secret) {
    return await getRequest(`/orgs/getbyid?_id=${_id}?org-secret=${org_secret}`, "getOrganizationById");
}

export {
    getOrganizations,
    createOrganization,
    addTeam,
    removeTeam,
    getOrganizationById
}