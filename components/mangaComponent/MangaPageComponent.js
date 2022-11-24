import React, {useEffect, useRef, useState} from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {useDispatch} from "react-redux";
import mangaService from "../../services/MangaService";
import {putMangaUser} from "../../public/src/features/MangaUserSlice";
import {
    ArrowUturnLeftIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/20/solid";
import AboutComponent from "../AboutComponent";
import {useSession} from "next-auth/react";

let images = []
function preload (page,size,currentManga) {

    if (+page===1){
        for (let i = +page; i < +page+3; i++) {

            if ((+page-1)<0){
                return;
            }else if(i>size){
                return;
            }else{
                images[i] = new Image();
                images[i].src = `https://cdn.dimasblog.my.id/galleries/${currentManga}/${i}.jpg`;
                images[i].width=826
                images[i].height=1200
            }
        }
    }else{
        for (let i = +page-1; i < +page+3; i++) {

            if ((+page-1)<0){
                return;
            }else if(i>size){
                return;
            }else{
                images[i] = new Image();
                images[i].src = `https://cdn.dimasblog.my.id/galleries/${currentManga}/${i}.jpg`;
                images[i].width=826
                images[i].height=1200
            }
        }
    }
    return null;
}

const MangaPageComponent = () => {

    const router= useRouter();
    const {data} = useSession();

    const page = router.query.pid;
    const manga = router.query.manga;
    const dispatch = useDispatch();

    const [currentManga, setCurrentManga] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [isError, setIsError] = useState(false);

    if (data){
        if (currentManga){
            const formData = new FormData();
            formData.append("currentPage",page.toString());
            const mangaId = currentManga;
            const userId = data.user.id;
            if (+page>pageSize){

            }else{
                dispatch(putMangaUser({formData,userId,mangaId}))
            }

        }
    }

    useEffect(() => {
        if (data){
            if (router.isReady){
                const userId = data.user.id;
                const id = router.query.manga;
                mangaService.getMangaDetailByOrderId({id, userId}).then((res)=>{
                    if (res.data.mangaUser !==null){
                        const formData = new FormData();
                        formData.append("currentPage",page.toString());
                        const mangaId = res.data.id;

                        if (+page>res.data.pageCount){

                        }else{
                            dispatch(putMangaUser({formData,userId,mangaId}))
                        }

                    }
                    setCurrentManga(res.data.id);
                    setPageSize(res.data.pageCount);

                }).catch(()=>{setIsError(true)})
            }

        }else{
            if (router.isReady){
                const userId = 0;
                const id = router.query.manga;

                mangaService.getMangaDetailByOrderId({id, userId}).then((res)=>{
                    setCurrentManga(res.data.id);
                    setPageSize(res.data.pageCount);

                }).catch(()=>{setIsError(true)})
            }
        }

    }, [router.isReady]);


    function useKey(key, cb) {
        const callbackRef = useRef(cb);

        useEffect(() => {
            callbackRef.current = cb;
        });
        useEffect(() => {
            function handle(event) {
                if (event.code === key) {
                    callbackRef.current(event);
                }
            }
            document.addEventListener("keydown", handle);
            return () => document.removeEventListener("keydown", handle);
        }, [key]);
    }

    function handleArrowLeft() {
        router.push(`/e/${manga}/${+page===1?'':+page-1}`)
    }
    function handleArrowRight() {
        router.push(+router.query.pid===pageSize?`/e/${manga}`:`/e/${manga}/${+page+1}`)
    }

    useKey('ArrowLeft',handleArrowLeft)
    useKey('ArrowRight',handleArrowRight)

    if (pageSize !==0){
        if(page>pageSize){
            return (<AboutComponent/>)
        }
    }

    return (
        isError===false?
        pageSize !==0 &&
        <div id={"reader"} className={"w-full"}>
          <div className={"bg-neutral-600"}>

              <div className={"flex justify-between py-1"}>
                <div className={"flex justify-start px-5 py-1 items-center"}>
                    <a href={`/e/${manga}`} className={"flex font-semibold"}>
                        <ArrowUturnLeftIcon className={"h-5 w-5 text-white mr-1"} />return
                    </a>
                </div>
                  <div className={" flex py-1 font-semibold items-center"}>
                      {
                          currentManga&&
                          <>{
                              +page !== 1 &&
                              <>
                                  <Link href={`/e/${manga}/1`}>
                                      <ChevronDoubleLeftIcon className={"h-5 w-5 text-white mr-1"} />
                                  </Link>
                                  <Link href={`/e/${manga}/${+page-1}`}>
                                      <ChevronLeftIcon className={"h-5 w-5 text-white mr-1"}/>
                                  </Link>
                              </>
                          }

                              {page} of {pageSize}

                              {
                                  +page !== pageSize &&
                                  <>
                                      <Link href={`/e/${manga}/${+page+1}`}>
                                          <ChevronRightIcon className={"h-5 w-5 text-white"}/>
                                      </Link>
                                      <Link href={`/e/${manga}/${pageSize}`}>
                                          <ChevronDoubleRightIcon className={"h-5 w-5 text-white mr-1"} />
                                      </Link>
                                  </>
                              }
                          </>
                      }

                  </div>
                  <div className={"flex justify-end px-5 py-1"}>

                  </div>
              </div>

              <div className={"bg-neutral-800"}>
                  <div className={"flex justify-center"}>
                      {
                          page&&
                            currentManga &&
                                    pageSize &&
                          (
                              +page===pageSize?
                                  <a href={`/e/${manga}`}>
                                      <img key={+page}
                                           src={`https://cdn.dimasblog.my.id/galleries/${currentManga}/${page}.jpg`}
                                           width={826} height={1200} alt={"page"} />
                                      {preload(page, pageSize, currentManga)}
                                  </a>


                                  : <Link href={{pathname: `/e/${manga}/${+page === pageSize ? '' : +page + 1}`}}>
                                      <img key={+page}
                                           src={`https://cdn.dimasblog.my.id/galleries/${currentManga}/${page}.jpg`}
                                           width={826} height={1200} alt={"page"} />
                                      {preload(page, pageSize, currentManga)}
                                  </Link>
                          )
                      }

                  </div>

              </div>

              <div className={"flex justify-between py-1"}>
                  <div className={"flex justify-start px-5 py-1 items-center"}>
                      <a href={`/e/${manga}`} className={"flex font-semibold"}>
                          <ArrowUturnLeftIcon className={"h-5 w-5 text-white mr-1"} />return
                      </a>
                  </div>
                  <div className={" flex py-1 font-semibold items-center"}>
                      {
                          currentManga&&
                          <>{
                              +page !== 1 &&
                              <>
                                  <Link href={`/e/${manga}/1`}>
                                      <ChevronDoubleLeftIcon className={"h-5 w-5 text-white mr-1"} />
                                  </Link>
                                  <Link href={`/e/${manga}/${+page-1}`}>
                                      <ChevronLeftIcon className={"h-5 w-5 text-white mr-1"}/>
                                  </Link>
                              </>
                          }

                              {page} of {pageSize}

                              {
                                  +page !== pageSize &&
                                  <>
                                      <Link href={`/e/${manga}/${+page+1}`}>
                                          <ChevronRightIcon className={"h-5 w-5 text-white"}/>
                                      </Link>
                                      <Link href={`/e/${manga}/${pageSize}`}>
                                          <ChevronDoubleRightIcon className={"h-5 w-5 text-white mr-1"} />
                                      </Link>
                                  </>
                              }

                          </>
                      }

                  </div>
                  <div className={"flex justify-end px-5 py-1"}>

                  </div>
              </div>

          </div>
        </div>:<AboutComponent/>
    );
};

export default MangaPageComponent;
