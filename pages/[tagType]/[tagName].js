import React from 'react';
import MangaTagResultComponent from "../../components/mangaTagComponent/MangaTagResultComponent";
import Head from "next/head";
import Header from "../../components/Header";
import {getToken} from "next-auth/jwt";

export async function getServerSideProps(context) {

    const secret = 'sdfkjhsdf92w5y29whg9240p34909yh09v0324703hn09eu2019';
    const token = await getToken({
        req: context.req,
        secret: secret
    });
    const userId = token?token.id:0;


    const pageSize = 25;
    const page = context.query.page?context.query.page:1;
    const tagName = context.query.tagName.replace(/-/g,' ');
    const tagType=context.query.tagType?context.query.tagType.toUpperCase():'TAG';

    const response = await fetch(`http://localhost:8080/api/v1/manga/tag?userId=${userId}&tagName=${tagName}&tagType=${tagType}&page=${+page-1}&size=${pageSize}`);

    if (response.status !== 200){
        return {
            notFound: true,
        }
    }else{
        const mangaListSSR = await response.json();
        return {
            props: {
                mangaListSSR:mangaListSSR,
                username:token?token.username:null,
                pageSize:pageSize,
                tagType:tagType
            }
        }
    }

}

const TagResult = ({mangaListSSR,username,pageSize}) => {

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
                <MangaTagResultComponent mangaListSSR={mangaListSSR} pageSize={pageSize} />
            </main>

            <footer>
            </footer>
        </div>
    );
};

export default TagResult;
