import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {  getAllRecreation,getOneR,deleteRecreation } from '../services/recreation.js'; 



const initialState={
  currentRecreation: {},
  recreationlist:[],
    error:"",
    loading:false
}

export const getAllR = createAsyncThunk(
    'get_all_recreation/getAllR',
    async (_, thunkAPI) => {
      try {
        const response = await getAllRecreation();
        return response.data; 
      } catch (error) {
        console.error('Error fetching recreation:', error); 
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );



export const getOR = createAsyncThunk(
  'get_all_recreation/getOR',
  async (id, thunkAPI) => {
    try {
      const response = await getOneR(id);
         
      return response.data; 
    } catch (error) {  
      console.error('Error fetching recreation:', error); 
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




export const deleteR = createAsyncThunk(
  'get_all_recreation/deleteR',
  async (id, thunkAPI) => {
    try {
      const response = await deleteRecreation(id);
      return { status: response.status, id }; 
    } catch (error) {  
      console.error('Error deleting recreation:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


   const recreationSlice = createSlice({
    name: 'recreation',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getAllR.fulfilled, (state, action) => {
         state.recreationlist = action.payload;
         state.loading = false;
         
        })
        builder.addCase(getAllR.pending, (state) => {
          state.loading = true;
         })
         
         .addCase(getAllR.rejected, (state, action) => {
           state.loading = false;
          state.error = action.payload;
          state.recreationlist=[]
          
        })

        .addCase(getOR.fulfilled, (state, action) => {
          state.currentRecreation = action.payload;
          state.loading = false;
          console.log(state.currentRecreation.id);
          
         })
         builder.addCase(getOR.pending, (state) => {
           state.loading = true;
          })
          
          .addCase(getOR.rejected, (state, action) => {
            state.loading = false;
           state.error = action.payload;
         })
         .addCase(deleteR.fulfilled, (state, action) => {
          state.recreationlist.pop(action.payload);
          state.loading = false;
          
         })
         builder.addCase(deleteR.pending, (state) => {
           state.loading = true;
          })
          
          .addCase(deleteR.rejected, (state, action) => {
            state.loading = false;
           state.error = action.payload;
         })

  
      }
  });
  export default recreationSlice.reducer;
  









