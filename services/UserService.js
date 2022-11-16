import http from "../public/src/http-common";


const register = ({username,email,password})=>{
    return http.post(`/auth/signup`,{username,email,password},{
        headers:{
            "Content-Type":"application/json"},
    })
}

const login = ({username,password})=>{
    return http.post(`/auth/signin`,{username,password},{
        headers:{
            "Content-Type":"application/json"},
    })
}

const getDetail = ({user})=>{
    return http.get(`/auth-detail/user`,{
        headers:{
            Authorization:`Bearer ${user.accessToken}`
        }
    })
}

const UserService = {
    register,login,getDetail
}

export default UserService
