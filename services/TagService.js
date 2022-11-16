import http from "../public/src/http-common";

const getTags = (params)=>{
    return http.get(`/tag/paginated`,{params})
}

const tagService = {
    getTags
}

export default tagService;
