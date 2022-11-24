import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import Image from "next/image";
import Link from "next/link";
import {saveMangaUser} from "../../public/src/features/MangaUserSlice";


const MangaDetailComponent = ({currentMangaSSR,userId}) => {

    const router = useRouter();

    useEffect(() => {
       if (userId){
           if (!currentMangaSSR.mangaUser){
               const formData = new FormData();
               formData.append("isWillRead","false")
               formData.append("isFavorite","false")
               formData.append("currentPage","0")
               const mangaId = currentMangaSSR.id
               dispatch(saveMangaUser({formData,userId,mangaId})).unwrap().then((response)=>{
                       currentMangaSSR.mangaUser = response;

                   }
               )

           }
       }
    }, []);


    const [initialThumbnailCount, setInitialThumbnailCount] = useState(10);

    const dispatch = useDispatch();


    function getPageThumbnails(number,mangaId) {
        let temp = [];
        let i = 1;

        if (number>=currentMangaSSR.pageCount){
            for (i; i <= currentMangaSSR.pageCount; i++) {
                temp.push(`https://cdn.dimasblog.my.id/galleries/thumbnail/${mangaId}/${i}.jpg`)
            }
        }else{
            for (i; i <= number; i++) {
                temp.push(`https://cdn.dimasblog.my.id/galleries/thumbnail/${mangaId}/${i}.jpg`)
            }
        }

        return temp;
    }
    const addMoreImage = ()=>{
        setInitialThumbnailCount(initialThumbnailCount+10);
    }

    const loadAllImages = ()=>{
        setInitialThumbnailCount(currentMangaSSR.pageCount);
    }

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
        <div className={"mx-auto w-full"}>
                    <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full bg-neutral-800 px-8 my-4"}>
                        <div className={"py-8"}>
                            {

                                <div className={"lg:grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 justify-items-start w-full"}>
                                    <div className={"col-span-1 justify-self-center text-center"}>
                                        <Link href={`/e/${currentMangaSSR.mangaOrder}/1`}>
                                            <Image alt={"main"} loading={"lazy"} quality={70} className={"rounded-md"} src={`https://cdn.dimasblog.my.id/galleries/thumbnail/${currentMangaSSR.id}/1.jpg`} width={350} height={500} />
                                        </Link>

                                        {userId===null &&
                                            <div className={"mt-2 w-full bg-emerald-500 py-1 rounded-md"}>
                                                <Link className={"bg-emerald-500 px-2 py-1 rounded-md w-full font-semibold"} href={{pathname:"/auth",query:{
                                                        option:"login"}
                                                }}>
                                                    Login to favorite this entry
                                                </Link>
                                            </div>
                                        }

                                    </div>

                                    <div className={"sm:w-full md:w-3/4"}>
                                        <div className={"font-bold text-2xl"}>
                                            {currentMangaSSR.title}
                                        </div>
                                        <hr className={"my-2 "}/>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Uploader
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap"}>
                                                {currentMangaSSR.createdBy.username}
                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Uploaded
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap"}>
                                                {new Date(currentMangaSSR.uploadDate).toUTCString()}
                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Pages
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap"}>
                                                {currentMangaSSR.pageCount}
                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Categories
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>

                                                {currentMangaSSR.category.map((cat)=>(
                                                    <Link key={cat.id} className={"mr-1 my-1"} href={{pathname:`/category/${cat.name.replace(/\s+/g, '-')}`}}>
                                                        <span className={`${cat.isLiked===true?'bg-blue-500':cat.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{cat.name}</span>
                                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(cat.mangaCount)}</span>
                                                    </Link>
                                                ))}

                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Groups
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>
                                                {currentMangaSSR.group.map((group)=>(
                                                    <Link key={group.id} className={"mr-1 my-1"} href={{pathname:`/group/${group.name.replace(/\s+/g, '-')}`}}>
                                                        <span className={`${group.isLiked===true?'bg-blue-500':group.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{group.name}</span>
                                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(group.mangaCount)}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Artists
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>
                                                {currentMangaSSR.artist.map((artist)=>(
                                                    <Link key={artist.id} className={"mr-1 my-1"} href={{pathname:`/artist/${artist.name.replace(/\s+/g, '-')}`}}>
                                                        <span className={`${artist.isLiked===true?'bg-blue-500':artist.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{artist.name}</span>
                                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(artist.mangaCount)}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                        {currentMangaSSR.parody.length===0?null:
                                            <div className={"flex flex-wrap mb-1"}>
                                                <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                    Parodies
                                                </div>
                                                <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>
                                                    {currentMangaSSR.parody.map((parody)=>(
                                                        <Link key={parody.id} className={"mr-1 my-1"} href={{pathname:`/parody/${parody.name.replace(/\s+/g, '-')}`}}>
                                                            <span className={`${parody.isLiked===true?'bg-blue-500':parody.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{parody.name}</span>
                                                            <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(parody.mangaCount)}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>

                                        }

                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Characters
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>
                                                {currentMangaSSR.character.map((character)=>(
                                                    <Link key={character.id} className={"mr-1 my-1"} href={{pathname:`/character/${character.name.replace(/\s+/g, '-')}`}}>
                                                        <span className={`${character.isLiked===true?'bg-blue-500':character.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{character.name}</span>
                                                        <span className={"bg-neutral-600 rounded-r-md px-2 py-1"}>{intToString(character.mangaCount)}</span>
                                                    </Link>
                                                ))}

                                            </div>
                                        </div>
                                        <div className={"flex flex-wrap mb-1"}>
                                            <div className={"sm:w-2/6 md:w-4/12 lg:w-1/8 font-bold pr-2 text-xl"}>
                                                Tags
                                            </div>
                                            <div className={"sm:w-4/6 md:w-8/12 lg:w-7/8 flex flex-wrap justify-start items-center"}>
                                                {currentMangaSSR.tag.map((tag)=>(
                                                    <Link key={tag.id} className={"mr-1 my-1"} href={{pathname:`/tag/${tag.name.replace(/\s+/g, '-')}`}}>
                                                        <span className={`${tag.isLiked===true?'bg-blue-500':tag.isLiked===false?'bg-neutral-900 text-neutral-500 line-through':'bg-neutral-900'} px-2 py-1 rounded-l-md `}>{tag.name}</span>
                                                        <span className={`bg-neutral-600 rounded-r-md px-2 py-1 ${tag.isLiked===false?'text-neutral-500 line-through':null}`}>{intToString(tag.mangaCount)}</span>
                                                    </Link>
                                                ))}

                                            </div>
                                        </div>

                                        <div className={"flex pt-5"}>{
                                            currentMangaSSR.mangaUser &&
                                            currentMangaSSR.mangaUser.currentPage !==0 ?
                                                currentMangaSSR.mangaUser.currentPage===currentMangaSSR.pageCount?<Link className={"py-5 px-5 bg-blue-500 rounded-md"} href={`/e/${currentMangaSSR.mangaOrder}/1`}>Start Over</Link>:
                                                    <Link className={"py-5 px-5 bg-blue-500 rounded-md"} href={`/e/${currentMangaSSR.mangaOrder}/${currentMangaSSR.mangaUser.currentPage}`}>CONTINUE READ</Link>:
                                                <Link className={"py-5 px-5 bg-blue-500 rounded-md"} href={`/e/${currentMangaSSR.mangaOrder}/1`}>READ NOW</Link>
                                        }
                                        </div>

                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div className={"container md:mx-auto md:w-3/4 md:rounded-lg w-full sm:w-full bg-neutral-800 px-8 my-4"}>
                        <div className={"container"}>
                            <div className={"flex flex-wrap gap-2 py-8 justify-center"}>
                                {
                                    getPageThumbnails(initialThumbnailCount,currentMangaSSR.id).map((page,index)=>(
                                        <div className={"py-1 px-1"}  key={page}>
                                            <div className={"bg-neutral-900 rounded-md"}>
                                                <Link href={`/e/${currentMangaSSR.mangaOrder}/${index+1}`}>
                                                    <Image className={"rounded-md"} loading={"lazy"} src={page} alt={"image"} width={235} height={350} />
                                                </Link>
                                            </div>
                                        </div>

                                    ))

                                }
                            </div>

                            {initialThumbnailCount < currentMangaSSR.pageCount &&
                                <div className={"py-3 text-center"}>
                                    <button onClick={addMoreImage} className={"bg-blue-500 py-3 px-3 rounded-md mr-2"}>More Images</button>
                                    <button onClick={loadAllImages} className={"bg-blue-500 py-3 px-3 rounded-md"}>Load All</button>
                                </div>
                            }

                        </div>

                    </div>
                </div>

    );


};

export default MangaDetailComponent;
