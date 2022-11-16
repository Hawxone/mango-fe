import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MangaService from "../../../services/MangaService";

const initialState= {
    mangaList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0,
    isLoading:true
}


export const searchPaginatedManga = createAsyncThunk(
    "manga-paginated/search",
    async ({params,id})=>{
        const res = await MangaService.searchManga({params, id});
        return res.data;
    }
)


const MangaSearchSlice = createSlice({
    name:"mangaListSearch",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(searchPaginatedManga.pending,(state,action)=>{
                return {
                    mangaList:[],
                    currentPage:0,
                    totalItems:0,
                    totalPages:0,
                    isLoading:true
                }
            })
            .addCase(searchPaginatedManga.fulfilled,(state,action)=>{
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

const {reducer} = MangaSearchSlice;
export default reducer;
