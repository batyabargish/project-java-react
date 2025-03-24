import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {  getAllUsers ,loginUser,signUpUser,updateUser} from '../services/users.js'; 



const initialState={
  currentUser: {},
    userslist:[],
    error:"",
    statusError:"",
    loading:false
}



export const getAll = createAsyncThunk(
    'get_all_users',
    async (_, thunkAPI) => {
      try {
        const response = await getAllUsers();
        return response.data; 
      } catch (error) {
        console.error('Error fetching users:', error); 
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const LoginUser=createAsyncThunk("user/LoginUser",async(user)=>{
    const userData=await loginUser(user);
    return userData.data;
  });

  export const registerUser = createAsyncThunk("user/registerUser", async (user) => {
    const userData = await signUpUser(user);  
    return userData;
});




export const updateU = createAsyncThunk("users/updateU", async ({ id, user }) => {
  const response = await updateUser(id, user); 
  return response;
});




export const loadUserFromStorage = createAsyncThunk("user/loadUserFromStorage", async () => {
  const storedUser = localStorage.getItem("currentUser");
  if (storedUser) {
      return JSON.parse(storedUser);
  }
  return null; 
});





  export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      logoutUser: (state) => {
        state.currentUser = null;
        localStorage.removeItem('currentUser');
      },
      updateUser: (state, action) => {
        state.currentUser = action.payload; 
      },
    },

    
    extraReducers: (builder) => {
        builder.addCase(getAll.fulfilled, (state, action) => {
         state.userslist = action.payload;
         state.loading = false;
        })
        builder.addCase(getAll.pending, (state) => {
          state.loading = true;
         })
         
         .addCase(getAll.rejected, (state, action) => {
           state.loading = false;
          state.error = action.payload;
        })

                  
                   .addCase(loadUserFromStorage.fulfilled, (state, action) => {
                    if (action.payload) {
                        state.currentUser = action.payload;
                    }
                })
        

      .addCase(LoginUser.fulfilled, (state, action) => {
        const userData = { ...action.payload, isAdmin: action.payload.admin };
        state.currentUser = userData;
        state.loading = false;
       
        
        console.log(state.currentUser.isAdmin);
    })

        .addCase(LoginUser.pending,(state)=>{
          state.loading=true;
      })
  
      .addCase(LoginUser.rejected,(state,action)=>{
          state.error=action.error.message;
          state.loading=false;
          state.statusError=action.status
      
          

      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.userslist.push(action.payload); 
        state.loading = false;
    })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
    })

    .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.statusError=action.error.status;
        state.loading = false;
    })


.addCase(updateU.fulfilled, (state, action) => {
    const updatedUser = action.payload;    
    state.currentUser = updatedUser;
 
    if (!updatedUser || !updatedUser.id) {
        console.error("Updated user data is missing or invalid.");
        return;
    }

    const existingUserIndex = state.userslist.findIndex(user => user.id === updatedUser.id);
    if (existingUserIndex !== -1) {
        state.userslist[existingUserIndex] = updatedUser;
    }

    state.currentUser = updatedUser;
    state.loading = false;
})
.addCase(updateU.rejected, (state, action) => {
    state.error = action.error.message;
    state.loading = false;
    console.error("Update failed:", action.error.message);
});

    
      }
  });
  export default userSlice.reducer;
  