import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ArtistService from "../../../services/ArtistService";


const initialState= {
    artistList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedArtists = createAsyncThunk(
    "artist-paginated/get",
    async ({params})=>{

        const res = await ArtistService.getArtists(params);
        return res.data;

    }
)

const ArtistSlice= createSlice({
    name:"artists",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedArtists.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = ArtistSlice;
export default reducer;
