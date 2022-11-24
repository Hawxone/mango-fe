import React, {useState} from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/20/solid";
import UserUploadPaginationComponent from "./UserUploadPaginationComponent";

const ManageUserUploadComponent = ({data,filter}) => {
    const path="/account/manage-uploads"

    const [query, setQuery] = useState("");

    const toggleSort = (col)=>{

        if (filter.filter.direction==="asc"){
            filter.setFilter({
                ...filter.column,column: col,
                ...filter.direction,direction: "desc",
                ...filter.query,query: filter.filter.query
            })
        }else if(filter.filter.direction==="desc"){
            filter.setFilter({
                ...filter.column,column: col,
                ...filter.direction,direction: "asc",
                ...filter.query,query: filter.filter.query
            })
        }
    }
    const onSearch = ()=>{
        filter.setFilter({...filter.filter,query:query})
    }

    const onKeyPressChange =(e)=>{
        setQuery(e.target.value)
    }

    return (
        <div>

            <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>

                <div className={"py-3"}>

                        <div className={"w-full flex py-2"}>
                            <div className={"w-1/3 flex justify-start"}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" onChange={onKeyPressChange} onKeyUp={(event)=>{if(event.key==='Enter'||event.keyCode===13){onSearch()}}}
                                           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-neutral-300 rounded-lg bg-neutral-50 focus:ring-neutral-500 focus:border-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-neutral-500 dark:focus:border-neutral-500"
                                           placeholder="Search Titles" />
                                    <button type="submit" onClick={()=>{onSearch()}}
                                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                                    </button>
                                </div>
                            </div>

                            <div className={"w-1/5 flex justify-end"}>
                                tes
                            </div>

                        </div>




                    <table className={"w-full"}>
                        <thead>
                        <tr className={"text-md font-semibold tracking-wide text-left text-white bg-neutral-900 uppercase border-b-2 border-b-blue-500"}>
                            <th className={"px-4 py-3"} onClick={()=>toggleSort("title")}><div className={"flex items-center"}>Title{filter.filter.column==="title"?filter.filter.direction==="asc"?<ChevronUpIcon className={"h-5"} />:<ChevronDownIcon className={"h-5"} />:null }</div></th>
                            <th className={"px-4 py-3"}>Pages</th>
                            <th className={"px-4 py-3"} onClick={()=>toggleSort("mangaOrder")}><div className={"flex items-center"}>Status{filter.filter.column==="mangaOrder"?filter.filter.direction==="asc"?<ChevronUpIcon className={"h-5"} />:<ChevronDownIcon className={"h-5"} />:null }</div></th>
                            <th className={"px-4 py-3"} onClick={()=>toggleSort("createdAt")}><div className={"flex items-center"}>Created Date{filter.filter.column==="createdAt"?filter.filter.direction==="asc"?<ChevronUpIcon className={"h-5"} />:<ChevronDownIcon className={"h-5"} />:null }</div></th>
                        </tr>
                        </thead>
                        <tbody className={"bg-neutral-800"}>

                        {
                            data.mangaList.map((manga)=>(
                                <tr key={manga.id} className={"even:bg-neutral-900 odd:bg-neutral-800"}>
                                    <td className={"px-4 py-3 border-b"}>
                                        {manga.title}
                                    </td>
                                    <td className={"px-4 py-3 border-b"}>
                                        {manga.pageCount}
                                    </td>
                                    <td className={"px-4 py-3 border-b"}>
                                        {manga.orderId?
                                            <div className={"px-2 py-1 bg-green-500 rounded-md text-center"}>published</div>:
                                            <div className={"px-2 py-1 bg-neutral-500 rounded-md text-center"}>draft</div>}
                                    </td>
                                    <td className={"px-4 py-3 border-b"}>
                                        {new Date(manga.createdDate).toDateString()}
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </table>
                </div>

                <UserUploadPaginationComponent
                    currentPage={data.currentPage+1}
                    totalItems={data.totalItems}
                    totalPages={data.totalPages}
                    pageSize = {25}
                    path={path}

                />
            </div>
        </div>
    );
};

export default ManageUserUploadComponent;
