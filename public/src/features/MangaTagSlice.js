import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MangaService from "../../../services/MangaService";


const initialState= {
    mangaList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0,
    loading:true
}

export const getPaginatedMangaByTagList = createAsyncThunk(
    "manga-paginated/get",
    async ({params,id})=>{
        console.log(id)
        const res = await MangaService.getMangaByTag({params, id});
        return res.data;
    }
)

const MangaTagSlice= createSlice({
    name:"mangaTagList",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedMangaByTagList.pending,(state,action)=>{
                return {
                    mangaList:[],
                    currentPage:0,
                    totalItems:0,
                    totalPages:0,
                    loading:true
                }
            })
            .addCase(getPaginatedMangaByTagList.fulfilled,(state,action)=>{
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

const {reducer} = MangaTagSlice;
export default reducer;
