import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MangaService from "../../../services/MangaService";

const initialState= {
        mangaList:[],
        currentPage:0,
        totalItems:0,
        totalPages:0,
        loading:true
}

export const getPaginatedMangaList = createAsyncThunk(
    "manga-paginated/get",
    async ({params,id})=>{
            const res = await MangaService.getMangaList({params, id});
            return res.data;
    }
)


const MangaSlice= createSlice({
    name:"mangaList",
    initialState,
     extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedMangaList.pending,(state,action)=>{
                return {
                    mangaList:[],
                    currentPage:0,
                    totalItems:0,
                    totalPages:0,
                    loading:true
                }
            })
            .addCase(getPaginatedMangaList.fulfilled,(state,action)=>{
                return {
                    mangaList:action.payload.mangaList,
                    currentPage:action.payload.currentPage,
                    totalItems:action.payload.totalItems,
                    totalPages:action.payload.totalPages,
                    loading:false
                }
            })
    }
})

const {reducer} = MangaSlice;
export default reducer;
