import React, {useState} from 'react';
import Link from "next/link";
import {PencilIcon} from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Uppy from '@uppy/core'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import XHRUpload from "@uppy/xhr-upload";
import {useRouter} from "next/router";


const UserDetailComponent = ({userData,authorization,token}) => {
    const router = useRouter();
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const uppy = new Uppy({
        meta: { type: 'avatar' },
        restrictions: { maxNumberOfFiles: 1 },
        autoProceed: false,
    })

    uppy.use(XHRUpload, {
        method:"POST",
        endpoint: 'http://localhost:8080/api/v1/auth-detail/user-avatar',
        headers:{
            Authorization:`Bearer ${authorization}`
        },
        formData: true,
        fieldName: 'file',
    })

    uppy.on('complete', (result) => {
        router.reload(window.location.pathname);
    })

    const roles = token.roles.map((role)=>{
        return role
    })

    const isAdmin = roles.some((role)=>{
        return role ==="ROLE_ADMIN"
    })

    const isMod = roles.some((role)=>{
        return role ==="ROLE_MODERATOR"
    })

    return (
        <div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-neutral-800 shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-white"
                                >
                                    Upload profile pic
                                </Dialog.Title>
                                <div className="mt-2">
                                    <Dashboard
                                        uppy={uppy}
                                        locale={{
                                            strings: {
                                                dropHereOr: 'Drop here or %{browse}',
                                                browse: 'browse',
                                            },
                                        }}
                                        hideUploadButton={true}
                                        theme={"dark"}
                                    />
                                </div>

                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm text-white bg-blue-500 border border-transparent rounded-md hover:bg-red-200 duration-300"
                                        onClick={()=>{uppy.upload()}}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                <div className={"py-4 flex"}>
                    <div className={"py-2 pr-6"}>
                        <div className={"relative"}>
                            <img className={"rounded-md "} src={userData.userDetails.imageUrl?`https://cdn.dimasblog.my.id/${userData.userDetails.imageUrl}`:"placeholder.png"} alt={"profile"} width={150} height={150} />
                            <button className={"absolute opacity-70 right-1 bottom-0.5 px-2 py-2 bg-blue-500 rounded-full"} onClick={openModal}><PencilIcon className={"h-4"} /></button>
                        </div>

                    </div>
                    <div>
                        <h1 className={"text-3xl font-semibold"}>{userData.userDetails.username}</h1>
                        <p><b>E-mail : </b>{userData.userDetails.email}</p>
                        <div className={"flex py-2"}>
                            <Link className={"px-2 py-2 mr-1 bg-blue-500 rounded-md"} href={"/account/manage-tags"}>Manage Your Tags</Link>
                            { isMod | isAdmin ?
                                <Link className={"px-2 py-2 mr-1 bg-blue-500 rounded-md"} href={"/account/manage-uploads"}>Manage Your Uploads</Link>:null
                            }

                        </div>
                    </div>
                </div>
            </div>
            <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                <div className={"flex border-b"}>
                    <div className={"text-2xl font-bold flex items-center"}>USER TAGS</div>
                </div>
                <div className={"grid sm:grid-cols-1 md:grid-cols-2 py-1"}>
                    <div>
                        <div className={"py-2"}>Liked Tags</div>
                        <div className={"flex flex-wrap"}>
                            {
                                userData.likedTags.map((tag)=>(
                                    <Link key={tag.id} className={"mr-1 my-1"} href={'#'}>
                                        <span className={`bg-blue-500 px-2 py-1 rounded-l-md `}>{tag.name}</span>
                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{tag.mangaCount}</span>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                    <div>
                        <div className={"py-2"}>Disliked Tags</div>
                        <div className={"flex flex-wrap"}>
                            {
                                userData.dislikedTags.map((tag)=>(
                                    <Link key={tag.id} className={"mr-1 my-1"} href={'#'}>
                                        <span className={`bg-red-500 px-2 py-1 rounded-l-md `}>{tag.name}</span>
                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{tag.mangaCount}</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailComponent;