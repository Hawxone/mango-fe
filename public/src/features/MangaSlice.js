import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import MangaService from "../../../services/MangaService";

const initialState= {
        mangaList:[],
        currentPage:0,
        totalItems:0,
        totalPages:0,
        loading:true
}

export const getPaginatedMangaListByUser = createAsyncThunk(
    "manga-paginated-user/get",
    async ({params,token})=>{
        const res = await MangaService.getMangaByUser({params,token});
        return res.data;
    }
)

const MangaSlice= createSlice({
    name:"mangaList",
    initialState,
     extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedMangaListByUser.pending,(state,action)=>{
                return {
                    mangaList:[],
                    currentPage:0,
                    totalItems:0,
                    totalPages:0,
                    loading:true
                }
            })
            .addCase(getPaginatedMangaListByUser.fulfilled,(state,action)=>{
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
