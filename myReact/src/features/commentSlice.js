import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllComments, addComment } from '../services/comment'; 

const initialState = {
  currentComment: null, 
  commentsList: [], 
  error: "",
  loading: false,
};

export const getAllC = createAsyncThunk(
  'comments/getAllC',
  async (_, thunkAPI) => {
    try {
      const response = await getAllComments();
      return response.data; 
    } catch (error) {
      console.error('Error fetching comments:', error); 
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addC = createAsyncThunk("comments/addC", async (newC, thunkAPI) => {
  console.log("Data being sent:", newC);
  try {
      return await addComment(newC);
     
  } catch (error) {
      console.error("Error in addComment:", error);
      return thunkAPI.rejectWithValue(error.message);
  }
});




const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getAllC.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      .addCase(getAllC.fulfilled, (state, action) => {
        state.commentsList = action.payload;
        state.loading = false;
      })
      .addCase(getAllC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
        state.commentsList = []; 
      });

    builder
    .addCase(addC.fulfilled, (state, action) => {
        state.commentsList.push(action.payload); 
        state.loading = false;
      })
      .addCase(addC.pending, (state) => {
        state.loading = true;
        state.error = ""; 
      })
      
      .addCase(addC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default commentSlice.reducer;
