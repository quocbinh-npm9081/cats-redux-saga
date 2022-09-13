import { createSlice } from "@reduxjs/toolkit";

export const catSlice = createSlice({
    name: 'cats',
    initialState: {
        cats: [],
        page: 1,
        isLoading: false
    },
    reducers: {
        getCatsFetch: state =>{
            state.isLoading = true;
        },
        getCatsSuccess: (state, action)=>{
            state.cats = action.payload.cats
            state.isLoading = false;
        },
        getCatsFailure: state =>{
            state.isLoading = false;
        },
        getMoreCats : (state, action) =>{
            state.isLoading = true;
            state.page += action.payload
        }
    }
})

export const {
    getCatsFetch, 
    getCatsSuccess,
    getCatsFailure,
    getMoreCats
    
    } = catSlice.actions;


export default catSlice.reducer