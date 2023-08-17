import { createSlice } from "@reduxjs/toolkit";
import { log } from "console";

export interface pdf{
    NumberOfPages : number,
    angle : number,
    pagesSelected : number[],
    deletedPages : string[]
}
const initialState : pdf ={
    NumberOfPages : 0,
    angle : 0,
    pagesSelected : [],
    deletedPages : []
}

export const ThumbnailPages = createSlice({
    name: 'ThumbnailPages', 
    initialState,
    reducers:{
        selectedThumbnails : (state,action) =>{
            state.pagesSelected = action.payload;
        },
        totalThumbailPages : (state, action) =>{
            state.NumberOfPages = action.payload;
        },
        deletedPages : (state, action) =>{
            state.deletedPages = action.payload;
        }
    } 
});

export const {selectedThumbnails, totalThumbailPages, deletedPages} = ThumbnailPages.actions;