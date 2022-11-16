import React, {useEffect} from 'react';
import {TagIcon} from "@heroicons/react/20/solid";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {getPaginatedTags} from "../../public/src/features/TagSlice";
import Link from "next/link";
import TagPaginationComponent from "./TagPaginationComponent";


const TagsComponent = () => {
    const router = useRouter()

    let tags =useSelector(state=>state.tags)
    const dispatch = useDispatch();

    let page = router.query.page;
    let sourceType="Tag";
    let path="/tags";
    const pageSize=25;


    const getRequestParams = (page, pageSize) => {
        let params = {};

        if (page) {
            params["page"] = page-1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    };

    const retrieveTags = ()=>{
        const params = getRequestParams(page,pageSize);
        dispatch(getPaginatedTags({params}))
    }
    useEffect(
            retrieveTags
        ,[dispatch,page,sourceType])


    return (
        <div className={"py-8"}>
            <div className={"flex justify-center border-b"}>
                   <div className={"text-2xl font-bold flex items-center"}>
                       <TagIcon className={"h-6 w-6 text-white"} />
                       TAGS</div>
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
            {tags.index &&
                <div>
                    Alphabet Index :   {tags.index.map((idx)=>(
                    <Link key={idx.name} className={`text-blue-700 mr-1`} href={{pathname:"/tags",query:{
                            page:Math.ceil(idx.index===0?1:idx.index/pageSize),
                            sourceType:"Tag"
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
                        tags &&tags.tagList.map((tag)=>(
                            <tr key={tag.id} className={"even:bg-neutral-900 odd:bg-neutral-800"}>
                                <td className={"px-4 py-2 border-b"}>{tag.name}</td>
                                <td className={"px-4 py-2 border-b"}>{tag.mangaCount}</td>
                                <td className={"px-4 py-2 border-b"}><Link className={'text-blue-700'} href={`/tag/${tag.name.replace(/\s+/g, '-')}`}>Go</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                {tags &&
                    <TagPaginationComponent
                    currentPage={tags.currentPage+1}
                    totalItems={tags.totalItems}
                    totalPages={tags.totalPages}
                    pageSize = {pageSize}
                    path={path}
                    sourceType={sourceType}
                    />

                }

            </div>
        </div>
    );
};

export default TagsComponent;
