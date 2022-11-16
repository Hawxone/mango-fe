import React from 'react';
import {UsePagination} from "../paginatorComponent/UsePagination";
import Link from "next/link";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

const SearchPaginationComponent = ({currentPage,totalItems,totalPages,path,pageSize,query}) => {

    const siblingCount = 3;
    let startIndex = ((currentPage-1)*pageSize)+1
    let endIndex = (currentPage)*pageSize
    let totalCount=totalItems;


    if (startIndex===totalItems){
        endIndex=totalItems
    }
    if(totalCount<pageSize || endIndex>pageSize){
        endIndex = totalCount
    }

    const paginationRange = UsePagination({
        totalCount,
        pageSize,
        siblingCount,
        currentPage
    })


    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-neutral-800 px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={{pathname:path,query:{q:query,page:currentPage-1}}}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    href={{pathname:path,query:{q:query,page:currentPage+1}}}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-50"
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-white">
                        Showing <span className="font-medium">{startIndex}</span> to <span className="font-medium">{endIndex}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="TagPaginationComponent">
                        <Link
                            href={currentPage===1?``:{pathname:path,query:{q:query,page:currentPage-1}}}
                            className={`relative ${currentPage===1?`pointer-events-none cursor-not-allowed`:null} inline-flex items-center rounded-l-md border border-gray-300 bg-neutral-800 px-2 py-2 text-sm font-medium text-white hover:bg-neutral-600 focus:z-20`}
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        {paginationRange.map((pageNumber)=>(
                            <Link key={parseInt(pageNumber)}
                                  href={{pathname:path,query:{q:query,page:parseInt(pageNumber)}}}
                                  aria-current="page"
                                  className={`relative z-10 inline-flex items-center border border-white ${(currentPage)===pageNumber?`bg-neutral-600`:`bg-neutral-800`} px-4 py-2 text-sm font-medium text-white focus:z-20`}
                            >
                                {pageNumber}
                            </Link>
                        ))}

                        <Link
                            href={currentPage===totalPages?`#`:{pathname:path,query:{q:query,page:currentPage+1}}}
                            className={`relative inline-flex ${currentPage===totalPages?`pointer-events-none cursor-not-allowed`:null}  items-center rounded-r-md border border-gray-300 bg-neutral-800 px-2 py-2 text-sm font-medium text-white hover:bg-neutral-600 focus:z-20`}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SearchPaginationComponent;
