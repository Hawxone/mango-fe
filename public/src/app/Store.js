import {configureStore} from "@reduxjs/toolkit";
import mangaReducer from "../features/MangaSlice";
import mangaUserReducer from "../features/MangaUserSlice";
import tagReducer from "../features/TagSlice";

const reducer = {
    mangaList:mangaReducer,
    mangaUser:mangaUserReducer,
    tag:tagReducer
}


const store = configureStore({
    reducer:reducer,
    devTools:true
})

export default store;
