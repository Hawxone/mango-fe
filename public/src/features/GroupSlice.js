import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import groupService from "../../../services/GroupService";

const initialState= {
    groupList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedGroups = createAsyncThunk(
    "groups-paginated/get",
    async ({params})=>{
        const res = await groupService.getGroups(params);
        return res.data;
    }
)

const GroupSlice = createSlice({
    name:"groups",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedGroups.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = GroupSlice;
export default reducer;
