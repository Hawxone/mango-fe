import React from 'react';
import {useRouter} from "next/router";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import MangaTagPaginationComponent from "./MangaTagPaginationComponent";



const MangaTagResultComponent = ({mangaListSSR,pageSize}) => {

    const router = useRouter();

    let tagName = router.query.tagName;
    let tagType = router.query.tagType;
    const path = `/${tagType}/${tagName}`;



    function intToString (value) {
        let suffixes = ["", "k", "m", "b","t"];
        let suffixNum = Math.floor((""+value).length/3);
        let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue+suffixes[suffixNum];
    }
    return (
            <div>
                <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                    <div className={"py-8"}>

                        <div className={"flex justify-center border-b"}>
                            <div className={"text-2xl font-bold flex items-center"}>
                                <MagnifyingGlassIcon className={"h-6 w-6 text-white"} />

                                        {tagType.toUpperCase()}
                                        <Link className={"mr-1 my-2 ml-2"} href={"#"}>
                                            <span className={"bg-neutral-900 px-2 py-1 rounded-l-md "}>{tagName.replace(/-/g,' ')}</span>
                                            <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(mangaListSSR.totalItems)}</span>
                                        </Link>

                            </div>
                        </div>

                        <div className={"mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5"}>
                            {
                                mangaListSSR.mangaList.map((manga)=>(

                                    <div key={manga.id} className={"rounded-md w-full h-full relative text-center group"}>
                                        <div className={"border-2 border-blue-500 rounded-md bg-neutral-600 absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-60"}></div>
                                        <Image alt={"image"} loading={"lazy"} quality={50} className={"rounded-md"} src={`https://cdn.dimasblog.my.id/galleries/thumbnail/${manga.id}/1.jpg`} width={450} height={650} />
                                        <div className={"border-2 border-blue-500 rounded-md absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100"}>

                                            <div className={"text-2xl font-semibold mt-5"}>
                                                {manga.title.substring(0,30)}
                                            </div>
                                            <div className={"text-sm"}>
                                                {manga.pageCount} pages
                                            </div>
                                            <Link className={"absolute bottom-1/4 left-1/4 right-1/4 border-2 py-5 "} href={`/e/${manga.orderId}`}>BUTTON</Link>

                                        </div>
                                        <Link className={"absolute bottom-0 left-0 right-0 bg-neutral-600 w-full py-0.5 border-t-2 border-t-blue-500 rounded-b-md px-1 opacity-70 group-hover:opacity-0"} href={"#"}>{manga.title.substring(0,20)}</Link>
                                    </div>
                                ))
                            }
                        </div>

                        <div className={"py-3"}>
                            <MangaTagPaginationComponent
                                currentPage={mangaListSSR.currentPage+1}
                                totalItems={mangaListSSR.totalItems}
                                totalPages={mangaListSSR.totalPages}
                                pageSize = {pageSize}
                                path={path}
                            />
                        </div>

                    </div>
                </div>
            </div>
    );
};

export default MangaTagResultComponent;
