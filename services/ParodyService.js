import http from "../public/src/http-common";

const getParodies = (params)=>{
    return http.get(`/parody/paginated`,{params})
}

const ParodyService = {
    getParodies
}

export default ParodyService;
