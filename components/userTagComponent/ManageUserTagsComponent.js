import React, { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {useDispatch, useSelector} from "react-redux";
import {getTagResult, updateuserTags} from "../../public/src/features/TagSlice";
import Link from "next/link";
import toast, { Toaster } from 'react-hot-toast';

const categories = [
    {
        name: 'Tag',
    },
    {
        name: 'Category',
    },
    {
        name: 'Group',
    },
    {
        name: 'Character',
    },
    {
        name: 'Parody',
    },
    {
        name: 'Artist',
    }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ManageUserTagsComponent = ({data,authorization}) => {

    const tagResults = useSelector(state => state.tag)
    const dispatch = useDispatch();

    const [selectedLiked, setSelectedLiked] = useState(categories[0])
    const [selectedDisliked, setSelectedDisliked] = useState(categories[0]);
    const [selectedTagLiked, setSelectedTagLiked] = useState(data.likedTags)
    const [selectedTagDisliked, setSelectedTagDisliked] = useState(data.dislikedTags);

    const appendLikedTag = (event)=>{

        const likedArr = selectedTagLiked.map(function (item){
            return item.name
        });

        const isDuplicate = likedArr.some((item)=>{
            return item ===event.name
        })

        if (isDuplicate){

        }else{
            const modifiedEvent = {...event}
            modifiedEvent.isLiked=true
            setSelectedTagLiked(selectedTagLiked=>[...selectedTagLiked,modifiedEvent])
        }


    }

    const deleteLikedTag = (id)=>{
        setSelectedTagLiked((current)=>current.filter((tag)=>tag.id !== id))
    }

    const appendDislikedTag = (event)=>{

        const dislikedArr = selectedTagDisliked.map(function (item){
            return item.name
        });

        const isDuplicate = dislikedArr.some((item)=>{
            return item ===event.name
        })

        if (isDuplicate){

        }else{
            const modifiedEvent = {...event}
            modifiedEvent.isLiked=false
            setSelectedTagDisliked(selectedTagDisliked=>[...selectedTagDisliked,modifiedEvent])
        }


    }

    const deleteDislikedTag = (id)=>{
        setSelectedTagDisliked((current)=>current.filter((tag)=>tag.id !== id))
    }

    const getRequestParams = (tagName,tagType) => {
        let params = {};

        if (tagName) {
            params["tagName"] = tagName;
        }

        if (tagType) {
            params["tagType"] = tagType;
        }

        return params;
    };

    const searchLikedTags = (event)=>{
        const q = event.target.value
        const params = getRequestParams(q,selectedLiked.name)
        setTimeout(()=>{
            dispatch(getTagResult({params}))
        },500)
    }

    const searchDislikedTags = (event)=>{
        const q = event.target.value
        const params = getRequestParams(q,selectedDisliked.name)
        setTimeout(()=>{
            dispatch(getTagResult({params}))
        },500)
    }

    const save=()=>{
        const userTags = [...selectedTagDisliked,...selectedTagLiked]
        const formData = new FormData();
        formData.append("userTags",JSON.stringify(userTags));

        dispatch(updateuserTags({authorization,formData})).then((res)=>{
            toast.success("Tags updated!")
        })
    }

    return (
        <div>
            <Toaster />
            <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                <div className={"grid md:grid-cols-2 sm:grid-cols-1"}>
                    <form className={"items-center justify-center mt-4 mb-1 px-5 py-1"}>
                        <div className={"flex border-b"}>
                            <div className={"text-2xl font-bold flex items-center"}>LIKED TAGS</div>
                        </div>
                        <div className={"flex flex-wrap py-2 px-2 my-2 bg-neutral-900 rounded-md"}>
                            {setSelectedTagLiked && selectedTagLiked.map((tag,index)=>(
                                <Link key={tag.id} className={"mr-1 my-1"} href={'#'} onClick={()=>deleteLikedTag(tag.id)}>
                                    <span id={tag.id}  className={`bg-blue-500 px-2 py-1 rounded-l-md `}>{tag.name} ({tag.tagType})</span>
                                    <span id={tag.id}  className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{tag.mangaCount}</span>
                                </Link>
                            ))}
                        </div>
                        <div className={"w-full w-full relative"}>
                            <div className={"flex"}>
                                <div className={"text-black relative w-1/4"}>
                                    <Listbox value={selectedLiked} onChange={setSelectedLiked}>
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1 w-full">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-l-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                  <span className="flex items-center">
                                                    <span className="ml-3 block truncate">{selectedLiked.name}</span>
                                                  </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                  </span>
                                                    </Listbox.Button>

                                                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">

                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {categories.map((category) => (
                                                                <Listbox.Option
                                                                    key={category.name}
                                                                    className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')} value={category}>
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{category.name}</span>
                                                                            </div>

                                                                            {selected ? (
                                                                                <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                              </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                <div className={"relative mt-1"}>
                                    <Combobox value={selectedTagLiked}  onChange={appendLikedTag}>
                                        <Combobox.Input className={"text-black rounded-r-md py-1 pl-3 h-full"} onChange={searchLikedTags} />
                                        {tagResults.length>0 &&
                                            <Combobox.Options className={"absolute text-black z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"}>
                                                {tagResults.map((result) => (
                                                    <Combobox.Option key={result.id} value={result} className={"hover:bg-neutral-300 px-1"}>
                                                        {result.name}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        }
                                    </Combobox>
                                </div>

                            </div>

                        </div>
                    </form>
                    <form className={"items-center justify-center mt-4 mb-1 px-5 py-1"}>
                        <div className={"flex border-b"}>
                            <div className={"text-2xl font-bold flex items-center"}>DISLIKED TAGS</div>
                        </div>
                        <div className={"flex flex-wrap py-2 px-2 my-2 bg-neutral-900 rounded-md"}>
                            {setSelectedTagDisliked && selectedTagDisliked.map((tag,index)=>(
                                <Link key={tag.id} className={"mr-1 my-1"} href={'#'} onClick={()=>deleteDislikedTag(tag.id)}>
                                    <span id={tag.id}  className={`bg-red-500 px-2 py-1 rounded-l-md `}>{tag.name} ({tag.tagType})</span>
                                    <span id={tag.id}  className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{tag.mangaCount}</span>
                                </Link>
                            ))}
                        </div>
                        <div className={"w-full relative"}>
                            <div className={"flex"}>
                                <div className={"text-black relative w-1/4"}>
                                    <Listbox value={selectedDisliked} onChange={setSelectedDisliked}>
                                        {({ open }) => (
                                            <>
                                                <div className="relative mt-1 w-full">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-l-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                                  <span className="flex items-center">
                                                    <span className="ml-3 block truncate">{selectedDisliked.name}</span>
                                                  </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                  </span>
                                                    </Listbox.Button>

                                                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">

                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {categories.map((category) => (
                                                                <Listbox.Option
                                                                    key={category.name}
                                                                    className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')} value={category}>
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <div className="flex items-center">
                                                                            <span
                                                                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>{category.name}</span>
                                                                            </div>

                                                                            {selected ? (
                                                                                <span className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                              </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                                <div className={"relative mt-1"}>
                                    <Combobox value={selectedTagDisliked}  onChange={appendDislikedTag}>
                                        <Combobox.Input className={"text-black rounded-r-md py-1 pl-3 h-full"} onChange={searchDislikedTags} />
                                        {tagResults.length>0 &&
                                            <Combobox.Options className={"absolute text-black z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"}>
                                                {tagResults.map((result) => (
                                                    <Combobox.Option key={result.id} value={result} className={"hover:bg-neutral-300 px-1"}>
                                                        {result.name}
                                                    </Combobox.Option>
                                                ))}
                                            </Combobox.Options>
                                        }
                                    </Combobox>
                                </div>

                            </div>

                        </div>
                    </form>
                </div>

                <div className={"px-5 my-2 justify-center flex"}>
                    <div className={"w-fit my-3"}>
                        <div className={"justify-center flex"}>
                            <button className={"px-4 py-2 bg-blue-500 font-semibold rounded-md text-xl"} onClick={save} >SAVE</button>
                        </div>
                        <div>
                            <Link className={"text-blue-600"} href={"/account"}>Done here? Return to profile</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ManageUserTagsComponent;