import http from "../public/src/http-common";

const getArtists = (params)=>{
    return http.get(`/artist/paginated`,{params})
}

const artistService = {
    getArtists
}

export default artistService;
