import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import TagsComponent from "../../components/tagsComponent/TagsComponent";
import {useRouter} from "next/router";
import ArtistsComponent from "../../components/tagsComponent/ArtistsComponent";
import CharactersComponent from "../../components/tagsComponent/CharactersComponent";
import ParodyComponent from "../../components/tagsComponent/ParodyComponent";
import GroupComponent from "../../components/tagsComponent/GroupComponent";
import CategoryComponent from "../../components/tagsComponent/CategoryComponent";
import {getToken} from "next-auth/jwt";

export async function getServerSideProps(context) {

    const secret = 'sdfkjhsdf92w5y29whg9240p34909yh09v0324703hn09eu2019';
    const token = await getToken({
        req: context.req,
        secret: secret
    });

    const userId = token?token.id:0;

    const pageSize = 25;
    const currentPage = context.query.page?context.query.page:1;
    const tagType=context.query.sourceType?context.query.sourceType.toUpperCase():'TAG';


    const response = await fetch(`http://localhost:8080/api/v1/tag/paginated?page=${+currentPage-1}&size=${pageSize}&tagType=${tagType}`);

    if (response.status !==200){
        return {
            notFound: true,
        }
    }else{
        const tagListSSR = await response.json();
        return {
            props: {
                tagListSSR:tagListSSR,
                user:userId,
                username:token?token.username:null,
                pageSize:pageSize,
                tagType:tagType
            }
        }
    }

}

const Tags = ({tagListSSR,tagType,username,pageSize}) => {

    return (
        <div className={"text-white"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header user={username} />
            <main className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                {tagType.toLowerCase()==="Tag".toLowerCase()?
                    <TagsComponent tagListSSR={tagListSSR} pageSize={pageSize} />:tagType.toLowerCase()==="Artist".toLowerCase()?
                        <ArtistsComponent tagListSSR={tagListSSR} pageSize={pageSize} />:tagType.toLowerCase()==="Character".toLowerCase()?
                            <CharactersComponent tagListSSR={tagListSSR} pageSize={pageSize} />:tagType.toLowerCase()==="Parody".toLowerCase()?
                                <ParodyComponent tagListSSR={tagListSSR} pageSize={pageSize} />:tagType.toLowerCase()==="Group".toLowerCase()?
                                    <GroupComponent tagListSSR={tagListSSR} pageSize={pageSize} />:tagType.toLowerCase()==="Category".toLowerCase()?
                                        <CategoryComponent tagListSSR={tagListSSR} pageSize={pageSize} />:<TagsComponent />}

            </main>
            <footer>
            </footer>
        </div>
    );
};

export default Tags;
