import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {getPaginatedGroups} from "../../public/src/features/GroupSlice";
import {TagIcon} from "@heroicons/react/20/solid";
import Link from "next/link";
import TagPaginationComponent from "./TagPaginationComponent";

const GroupComponent = () => {

    const router = useRouter();
    let groups = useSelector(state => state.groups);
    const dispatch = useDispatch();
    let page = router.query.page;
    let sourceType="Group";
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

    const retrieveGroups = ()=>{
        const params = getRequestParams(page,pageSize);
        dispatch(getPaginatedGroups({params}));
    }

    useEffect(
        retrieveGroups
        , [dispatch,page,sourceType]);


    return (
        <div className={"py-8"}>
            <div className={"flex justify-center border-b"}>
                <div className={"text-2xl font-bold flex items-center"}>
                    <TagIcon className={"h-6 w-6 text-white"} />
                    GROUP</div>
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
                groups.index&&
                <div>
                    Alphabet Index :   {groups.index.map((idx)=>(
                    <Link key={idx.name} className={`text-blue-700 mr-1`} href={{pathname:"/tags",query:{
                            page:Math.ceil(idx.index===0?1:idx.index/pageSize),
                            sourceType:"Group"
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
                        groups && groups.groupList.map((group)=>(
                            <tr key={group.id} className={"even:bg-neutral-900 odd:bg-neutral-800"}>
                                <td className={"px-4 py-2 border-b"}>{group.name}</td>
                                <td className={"px-4 py-2 border-b"}>{group.mangaCount}</td>
                                <td className={"px-4 py-2 border-b"}><Link className={'text-blue-700'} href={`/group/${group.name.replace(/\s+/g, '-')}`}>Go</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>

                {groups &&
                    <TagPaginationComponent
                        currentPage={groups.currentPage+1}
                        totalItems={groups.totalItems}
                        totalPages={groups.totalPages}
                        pageSize = {pageSize}
                        path={path}
                        sourceType={sourceType}
                    />
                }
            </div>

        </div>
    );
};

export default GroupComponent;
