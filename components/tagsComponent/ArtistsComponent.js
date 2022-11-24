import React from 'react';
import {TagIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import {useRouter} from "next/router";
import TagPaginationComponent from "./TagPaginationComponent";


const ArtistsComponent = ({tagListSSR,pageSize}) => {

    const router = useRouter();
    let sourceType="Artist";
    let path="/tags";


    return (
        <div className={"py-8"}>
            <div className={"flex justify-center border-b"}>
                <div className={"text-2xl font-bold flex items-center"}>
                    <TagIcon className={"h-6 w-6 text-white"} />
                    ARTIST</div>
            </div>
            <div className={"mt-1"}>
                Tag Type :
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Tag"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Tag"}}}>Tag</Link>
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Artist"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Artist"}}}>Artist</Link>
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Character"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Character"}}}>Character</Link>
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Parody"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Parody"}}}>Parody</Link>
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Group"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Group"}}}>Group</Link>
                <Link className={`text-blue-700 mr-1 ${router.query.sourceType==="Category"?`underline`:null}`} href={{pathname:"/tags",query:{sourceType:"Category"}}}>Category</Link>
            </div>
            {
               <div>
                    Alphabet Index :   {tagListSSR.index.map((idx)=>(
                    <Link key={idx.name} className={`text-blue-700 mr-1`} href={{pathname:"/tags",query:{
                            page:Math.ceil(idx.index===0?1:idx.index/pageSize),
                            sourceType:"Artist"
                        }}}>{idx.name.toUpperCase()}</Link>
                ))}

                </div>

            }

            <div className={"my-4"}>
                <table className={"w-full"}>
                    <thead className={"bg-neutral-900 text-left px-4"}>
                    <tr className={"border-t-2 border-b-2"}>
                        <th className={"px-4 py-2"}>Name</th>
                        <th className={"px-4 py-2"}>Count</th>
                        <th className={"px-4 py-2"}></th>
                    </tr>
                    </thead>
                    <tbody >
                    {
                        tagListSSR.tagList.map((artist)=>(
                            <tr key={artist.id} className={"even:bg-neutral-900 odd:bg-neutral-800"}>
                                <td className={"px-4 py-2 border-b"}>{artist.name}</td>
                                <td className={"px-4 py-2 border-b"}>{artist.mangaCount}</td>
                                <td className={"px-4 py-2 border-b"}><Link className={'text-blue-700'} href={`/artist/${artist.name.replace(/\s+/g, '-')}`}>Go</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>


                    <TagPaginationComponent
                        currentPage={tagListSSR.currentPage+1}
                        totalItems={tagListSSR.totalItems}
                        totalPages={tagListSSR.totalPages}
                        pageSize = {pageSize}
                        path={path}
                        sourceType={sourceType}
                    />

            </div>

        </div>
    );
};

export default ArtistsComponent;
