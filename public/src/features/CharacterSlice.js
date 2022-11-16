import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import characterService from "../../../services/CharacterService";

const initialState= {
    characterList:[],
    currentPage:0,
    totalItems:0,
    totalPages:0
}

export const getPaginatedCharacters = createAsyncThunk(
    "characters-paginated/get",
    async ({params})=>{
        const res = await characterService.getCharacters(params);
        return res.data;
    }
)

const CharacterSlice = createSlice({
    name:"characters",
    initialState,
    extraReducers:(builder)=>{
        builder
            .addCase(getPaginatedCharacters.fulfilled,(state,action)=>{
                return action.payload
            })
    }
})

const {reducer} = CharacterSlice;
export default reducer;
