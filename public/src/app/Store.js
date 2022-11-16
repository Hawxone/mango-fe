import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "../features/UserSlice";
import tagsReducer from "../features/TagSlice";
import artistReducer from "../features/ArtistSlice";
import characterReducer from "../features/CharacterSlice";
import parodyReducer from "../features/ParodySlice";
import groupReducer from "../features/GroupSlice";
import categoryReducer from "../features/CategorySlice";
import mangaReducer from "../features/MangaSlice";
import mangaSearchReducer from "../features/MangaSearchSlice";
import mangaUserReducer from "../features/MangaUserSlice";
import mangaTagReducer from "../features/MangaTagSlice";

const reducer = {
    users:usersReducer,
    tags:tagsReducer,
    artists:artistReducer,
    characters:characterReducer,
    parodies:parodyReducer,
    groups:groupReducer,
    categories:categoryReducer,
    mangaList:mangaReducer,
    mangaUser:mangaUserReducer,
    mangaSearch:mangaSearchReducer,
    mangaTag:mangaTagReducer
}


const store = configureStore({
    reducer:reducer,
    devTools:true
})

export default store;
