import http from "../public/src/http-common";

const getTags = (params)=>{
    return http.get(`/tag/name`,{params})
}

const updateUserTags = ({formData,authorization})=>{
    return http.put(`/auth-detail/tag`,formData,{headers:{
        Authorization:`Bearer ${authorization}`
        }})
}

const tagService = {
 getTags,updateUserTags
}

export default tagService;
