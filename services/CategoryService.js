import http from "../public/src/http-common";

const getCategories = (params)=>{
    return http.get(`/category/paginated`,{params})
}

const categoryService = {
    getCategories
}

export default categoryService;
