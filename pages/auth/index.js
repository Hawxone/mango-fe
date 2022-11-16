import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import AuthComponent from "../../components/authComponent/AuthComponent";

const Auth = () => {


    return (
        <div className={"text-white"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <AuthComponent />
            </main>

            <footer>
            </footer>
        </div>
    );
};

export default Auth;