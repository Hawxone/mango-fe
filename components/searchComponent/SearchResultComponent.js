import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {MagnifyingGlassIcon} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import SearchPaginationComponent from "./SearchPaginationComponent";
import {searchPaginatedManga} from "../../public/src/features/MangaSearchSlice";

const SearchResultComponent = () => {
    const { userInfo } = useSelector((state) => state.users);
    let mangaLists = useSelector(state => state.mangaSearch);
    const dispatch = useDispatch();
    const router = useRouter();
    let page = router.query.page;

    const query = router.query.q
    const pageSize=25;
    const path = "/search";

    const getRequestParams = (page, pageSize,query) => {
        let params = {};

        if (page) {
            params["page"] = page-1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }
        if (query){
            params["query"] = query;
        }

        return params;
    };



    useEffect(() => {
       if (query){
           if (router.isReady){
               const params = getRequestParams(page,pageSize,query)
               if (userInfo){
                   const id = userInfo.id;
                   dispatch(searchPaginatedManga({params,id}));
               }else{
                   const id = 0;
                   dispatch(searchPaginatedManga({params,id}));
               }
           }
       }

    }, [dispatch,router.isReady,page,pageSize,query]);


    return (
        <div>
            <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                <div className={"py-8"}>
                    <div className={"flex justify-center border-b"}>
                        <div className={"text-2xl font-bold flex items-center"}>
                            <MagnifyingGlassIcon className={"h-6 w-6 text-white"} />
                            {mangaLists &&
                                <span>{mangaLists.totalItems} RESULT{mangaLists.length !== 1?"S":null}</span>
                            }
                        </div>
                    </div>
                    <div className={"mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5"}>
                        {
                            mangaLists.mangaList &&
                            mangaLists.mangaList.map((manga)=>(

                                <div key={manga.id} className={"rounded-md w-full h-full relative text-center group"}>
                                    {manga.verdict==="liked"?<div className={`ribbon ribbon-top-right group-hover:hidden`}><span>fave</span></div>:null}
                                    <div className={"border-2 border-blue-500 rounded-md bg-neutral-600 absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-60"}></div>
                                    <Image alt={"image"} loading={"lazy"} quality={50} className={"rounded-md"} src={`https://cdn.dimasblog.my.id/galleries/thumbnail/${manga.id}/1.jpg`} width={450} height={650} />
                                    <div className={"border-2 border-blue-500 rounded-md absolute top-0 bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100"}>

                                        <div className={"text-2xl font-semibold mt-5"}>
                                            {manga.title.substring(0,30)}
                                        </div>
                                        <div className={"text-sm"}>
                                            {manga.pageCount} pages
                                        </div>
                                        <Link className={"absolute bottom-1/4 left-1/4 right-1/4 border-2 py-5 "} href={`e/${manga.orderId}`}>BUTTON</Link>

                                    </div>
                                    <Link className={"absolute bottom-0 left-0 right-0 bg-neutral-600 w-full py-0.5 border-t-2 border-t-blue-500 rounded-b-md px-1 opacity-70 group-hover:opacity-0"} href={"#"}>{manga.title.substring(0,20)}</Link>
                                </div>
                            ))
                        }
                    </div>

                    <div className={"py-3"}>
                        <SearchPaginationComponent
                            currentPage={mangaLists.currentPage+1}
                            totalItems={mangaLists.totalItems}
                            totalPages={mangaLists.totalPages}
                            pageSize = {pageSize}
                            path={path}
                            query={query}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchResultComponent;
