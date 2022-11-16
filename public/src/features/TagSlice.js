import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import TagService from "../../../services/TagService";

const initialState= {
    tagList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedTags = createAsyncThunk(
    "tag-paginated/get",
    async ({params})=>{

        const res = await TagService.getTags(params);
        return res.data;

    }
)

const TagSlice= createSlice({
    name:"tags",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedTags.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = TagSlice;
export default reducer;
