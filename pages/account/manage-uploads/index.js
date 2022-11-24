import React, {useEffect, useState} from 'react';
import {getToken} from "next-auth/jwt";
import Head from "next/head";
import Header from "../../../components/Header";
import ManageUserUploadComponent from "../../../components/userUploadsComponent/ManageUserUploadsComponent";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getPaginatedMangaListByUser} from "../../../public/src/features/MangaSlice";


export async function getServerSideProps(context) {
    const secret = 'sdfkjhsdf92w5y29whg9240p34909yh09v0324703hn09eu2019';
    const token = await getToken({
        req: context.req,
        secret: secret
    });

    const roles = token.roles.map((role)=>{
        return role
    })

    const isAdmin = roles.some((role)=>{
        return role ==="ROLE_ADMIN"
    })

    const isMod = roles.some((role)=>{
        return role ==="ROLE_MODERATOR"
    })

    if (!isAdmin && !isMod){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }else{

        return {
            props: {
                username:token.username,
                token:token.accessToken
            }
        }
    }
}

const Index = ({username,token}) => {

    const router = useRouter();
    const page = router.query.page?router.query.page:0;
    const pageSize = 25;
    const dispatch = useDispatch();


    const [filter, setFilter] = useState({
        query:"",
        column:"title",
        direction:"asc"
    });

    const mangaList = useSelector(state => state.mangaList);


    const getRequestParams = (page, pageSize,column,direction) => {
        let params = {};

        if (page) {
            params["page"] = page-1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        if (column && direction) {
            params["sort"] = column+","+direction;
        }

        return params;
    };

    useEffect(() => {
        if (page){
        const params = getRequestParams(page,pageSize,filter.column,filter.direction)
            dispatch(getPaginatedMangaListByUser({params,token}))
        }else {
            const params = getRequestParams(0,pageSize,filter.column,filter.direction)
            dispatch(getPaginatedMangaListByUser({params,token}))
        }

    }, [dispatch, filter, page, token]);



    return (
        <div className={"text-white"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <Header user={username} />
            <main>
            </main>
                <ManageUserUploadComponent data={mangaList} filter={{filter,setFilter}} />
            <footer>
            </footer>
        </div>
    );
};

export default Index;
