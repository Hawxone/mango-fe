import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const providers = [
    CredentialsProvider({
        name:'credentials',
        credentials:{},
        authorize:async (credentials,req)=>{

            const {username,password} = credentials

            const user  = await axios.post('http://localhost:8080/api/v1/auth/signin',{
                    username:username,
                    password:password
            })

            if (user){
                return user
            }else {
                return null
            }

        }
    })
]

const callbacks = {

    async session({ session, token, user }) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.imageUrl = token.imageUrl;
        return session;
    },

    async jwt({ token, account, user }) {
        if (account) {
            token.accessToken = user.data.accessToken
            token.id = user.data.id
            token.username = user.data.username
            token.imageUrl = user.data.imageUrl
            token.roles = user.data.roles
        }
        return token
    }
}


const options = {
    providers,
    callbacks,
    secret: "sdfkjhsdf92w5y29whg9240p34909yh09v0324703hn09eu2019",
}

export default (req,res)=> NextAuth(req,res,options)
