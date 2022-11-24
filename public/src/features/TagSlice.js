import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import tagService from "../../../services/TagService";
import MangaService from "../../../services/MangaService";

const initialState= {
}

export const getTagResult = createAsyncThunk(
    'tag/search',
    async ({params})=>{
        const res = await tagService.getTags(params);
        return res.data;
    }
)

export const updateuserTags = createAsyncThunk(
    'tag/update',
    async ({formData,authorization})=>{
        console.log(formData.get("userTags"))
        const res = await tagService.updateUserTags({formData,authorization})
        return res.data;
    }
)

const tagSlice = createSlice({
    name:"tag",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getTagResult.fulfilled,(state, action)=>{
                return action.payload
            })
    }
})

const {reducer} = tagSlice;
export default reducer;