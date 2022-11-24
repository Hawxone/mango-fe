import React from 'react';
import Head from "next/head";
import Header from "../../../components/Header";
import MangaPageComponent from "../../../components/mangaComponent/MangaPageComponent";

const MangaPageId = () => {
    return (
        <div className={"text-white"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/public/favicon.ico" />
            </Head>
            <Header />
            <main>
                <MangaPageComponent />
            </main>

            <footer>
            </footer>
        </div>
    );
};

export default MangaPageId;
