import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utility/index";

const initialState = {
    isLoading : false,
    userList : []
};

// -----------------------------------
// Fetch All Projects

export const fetchAllUsers = createAsyncThunk("admin/allusers",
    async (_, thunkAPI) => {
        try {
          const response = await Api.get(
            "/api/auth/allusers",
            {withCredentials: true}
          );
          return  response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// -----------------------------------
// change role

export const changeRole = createAsyncThunk("admin/changeRole",
    async (formData, thunkAPI) => {
        console.log("inside admin change role : ",formData);
        
        try {
        const response = await Api.patch(
            `/api/auth/changerole`,
            formData,
            {withCredentials: true}
        );
        return  response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// -----------------------------------
// verify user

export const verifyUser = createAsyncThunk("admin/verifyUser",
    async (id, thunkAPI) => {
        console.log("inside user verify : ",id);
        
        try {
            const response = await Api.patch(
                `/api/auth/verifybyadmin/${id}`,
                {via : 'admin'},
                {withCredentials: true}
            );
        return  response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// -----------------------------------
// delete Project

export const deleteUser = createAsyncThunk("admin/deleteuser",
    async (id, thunkAPI) => {
        console.log("inside admin del : ",id);
        
        try {
        const response = await Api.delete(
            `/api/auth/deleteUser/${id}`,
            {withCredentials: true}
        );
        return  response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// -----------------------------------
// delete unverified user

export const deleteUnverifiedUser = createAsyncThunk("admin/deleteUnverifiedUser",
    async (id, thunkAPI) => {
        console.log("inside admin del : ",id);
        
        try {
        const response = await Api.delete(
            `/api/auth/delete-unverified-users`,
            {withCredentials: true}
        );
        return  response.data;
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


// **********************************************************************************

const adminUserSlice = createSlice({
    name : "adminUserSlice",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchAllUsers.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchAllUsers.fulfilled, (state, action)=>{
            state.isLoading = false;
            console.log("list all proj : " ,action.payload);
            state.userList = (action?.payload?.success) ? action.payload?.data : [];
        }).addCase(fetchAllUsers.rejected, (state)=>{
            state.isLoading = false;
            state.userList = [];
        })

        .addCase(changeRole.pending, (state)=>{
            state.isLoading = true;
        }).addCase(changeRole.fulfilled, (state, action)=>{
            state.isLoading = false;
        }).addCase(changeRole.rejected, (state)=>{
            state.isLoading = false;
        })

        .addCase(verifyUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(verifyUser.fulfilled, (state, action)=>{
            state.isLoading = false;
        }).addCase(verifyUser.rejected, (state)=>{
            state.isLoading = false;
        })

        .addCase(deleteUnverifiedUser.pending, (state)=>{
            state.isLoading = true;
        }).addCase(deleteUnverifiedUser.fulfilled, (state, action)=>{
            state.isLoading = false;
        }).addCase(deleteUnverifiedUser.rejected, (state)=>{
            state.isLoading = false;
        });
    }
});

export const {} = adminUserSlice.actions;
export default adminUserSlice.reducer;