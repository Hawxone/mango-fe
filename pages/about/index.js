import React from 'react';
import Head from "next/head";
import Header from "../../components/Header";
import AboutComponent from "../../components/AboutComponent";

const About = () => {
    return (
        <div className={"text-white"}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <AboutComponent />
            </main>

            <footer>
            </footer>
        </div>
    );
};

export default About;
