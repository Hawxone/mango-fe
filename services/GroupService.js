import http from "../public/src/http-common";

const getGroups = (params)=>{
    return http.get(`/group/paginated`,{params})
}

const groupService = {
    getGroups
}

export default groupService;
