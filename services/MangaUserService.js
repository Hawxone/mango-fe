import http from "../public/src/http-common";

const saveMangaUser = ({formData,userId,mangaId})=>{
    return http.post(`/mangauser/manga/${mangaId}/user/${userId}`,formData)
}

const putMangaUser = ({formData,userId,mangaId})=>{
    return http.put(`/mangauser/manga/${mangaId}/user/${userId}`,formData)
}

const artistService = {
    saveMangaUser,putMangaUser
}

export default artistService;
