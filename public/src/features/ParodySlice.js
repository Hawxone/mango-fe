import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import ParodyService from "../../../services/ParodyService";


const initialState= {
    parodyList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedParodies = createAsyncThunk(
    "parodies-paginated/get",
    async ({params})=>{

        const res = await ParodyService.getParodies(params);
        return res.data;

    }
)

const ParodySlice = createSlice({
    name:"parodies",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedParodies.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = ParodySlice;
export default reducer;
