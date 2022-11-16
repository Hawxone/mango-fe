import http from "../public/src/http-common";

const getCharacters = (params)=>{
    return http.get(`/character/paginated`,{params})
}

const characterService = {
    getCharacters
}

export default characterService;
