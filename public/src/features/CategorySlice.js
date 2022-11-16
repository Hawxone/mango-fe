import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CategoryService from "../../../services/CategoryService";

const initialState= {
    categoryList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedCategories = createAsyncThunk(
    "category-paginated/get",
    async ({params})=>{

        const res = await CategoryService.getCategories(params);
        return res.data;

    }
)

const CategorySlice= createSlice({
    name:"categories",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedCategories.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = CategorySlice;
export default reducer;
