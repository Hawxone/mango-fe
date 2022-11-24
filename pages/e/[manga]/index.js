import React from 'react';
import Head from "next/head";
import Header from "../../../components/Header";
import MangaDetailComponent from "../../../components/mangaComponent/MangaDetailComponent";
import {getToken} from "next-auth/jwt";


export async function getServerSideProps(context) {

    const secret = 'sdfkjhsdf92w5y29whg9240p34909yh09v0324703hn09eu2019';
    const token = await getToken({
        req: context.req,
        secret: secret
    });

    const userId = token?token.id:0;
    const id = context.query.manga;

    const response = await fetch(`http://localhost:8080/api/v1/manga/order/${id}?userId=${userId}`);

    if (response.status !== 200){
        return {
            notFound: true,
        }
    }else{
        const currentMangaSSR = await response.json();
        return {
            props: {
                currentMangaSSR:currentMangaSSR,
                user:token?token.id:0,
                username:token?token.username:null
            }
        }
    }

}

const MangaDetailPage = ({currentMangaSSR,username,user}) => {

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
                <MangaDetailComponent currentMangaSSR={currentMangaSSR} userId = {user} />
            </main>

            <footer>
            </footer>
        </div>
    );
};

export default MangaDetailPage;
