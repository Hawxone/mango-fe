import http from "../public/src/http-common";


const getMangaList = ({params,id})=>{
    return http.get(`/manga?userId=${id}`,{params})
}

const searchManga = ({params,id})=>{
    return http.get(`/manga/search?userId=${id}`,{params})
}

const getMangaDetailByOrderId = ({id,userId})=>{
    return http.get(`/manga/order/${id}?userId=${userId}`)
}

const getMangaByTag = ({params,id})=> {
    return http.get(`/manga/tag?userId=${id}`, {params})
}

const getMangaByUser = ({params,token})=>{
    return http.get(`http://localhost:8080/api/v1/manga/user`,{
        headers:{
            Authorization:"Bearer "+token
        },
        params
    })
}

const mangaService = {
    getMangaList,getMangaDetailByOrderId,searchManga,getMangaByTag,getMangaByUser
}

export default mangaService;
