import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import mangaUserService from "../../../services/MangaUserService";

const initialState= {
    id:null,
    isFavorite:false,
    currentPage:null,
    isWillRead:false,
    userId:null,
    mangaId:null
}

export const saveMangaUser = createAsyncThunk(
    "mangaUser/save",
    async ({formData,userId,mangaId})=>{
        const res = await mangaUserService.saveMangaUser({formData,userId,mangaId});
        return res.data;
    }
)

export const putMangaUser = createAsyncThunk(
    "mangaUser/put",
    async ({formData,userId,mangaId})=>{
        const res = await mangaUserService.putMangaUser({formData,userId,mangaId});
        return res.data;
    }
)

const MangaUserSlice = createSlice({
    name:"mangaUser",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(saveMangaUser.fulfilled,(state,action)=>{
                return action.payload;
            })
            .addCase(putMangaUser.fulfilled,(state,action)=>{
                return action.payload;
            })
    }
})

const {reducer} = MangaUserSlice;
export default reducer;

