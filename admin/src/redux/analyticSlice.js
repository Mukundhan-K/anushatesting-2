import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../utility/index";

const initialState = {
    isLoading : false,
    totalLogins : null,
    uniqueUserCount : null,
    underConstruction : null,
    completedProjects : null,
    totalProjects : null,
    totalUsers : null,
    adminsNo : null,
    normalUsers : null,
    editorUsers : null,
    verifiedUsers : null,
    unverifiedUsers : null,
    logUserList : []
};

// -----------------------------------
// Fetch login stats

export const fetchLoginLogs = createAsyncThunk("admin/fetchLoginLogs",
    async (_, thunkAPI) => {
        try {
          const response = await Api.get(
            "/api/analytics/logins",
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
// Fetch per user login stats

export const fetchPerUserLoginLogs = createAsyncThunk("admin/PerUserLoginLogs",
    async (_, thunkAPI) => {
        try {
          const response = await Api.get(
            "/api/analytics/perlogins",
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
// Fetch project stats

export const fetchProjectStats = createAsyncThunk("admin/fetchProjectStats",
    async (_, thunkAPI) => {
        try {
          const response = await Api.get(
            "/api/analytics/getprojectstats",
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
// Fetch user stats

export const fetchUSerStats = createAsyncThunk("admin/fetchUSerStats",
    async (_, thunkAPI) => {
        try {
          const response = await Api.get(
            "/api/analytics/getuserstats",
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

const analyticSlice = createSlice({
    name : "analyticSlice",
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(fetchLoginLogs.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchLoginLogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            // console.log("list all log list : " ,action.payload);
            if (action?.payload?.success) {
              state.uniqueUserCount = action.payload?.data?.uniqueUserCount;
              state.totalLogins = action.payload?.data?.totalLogins;
            }
        }).addCase(fetchLoginLogs.rejected, (state)=>{
            state.isLoading = false;
        })

        .addCase(fetchPerUserLoginLogs.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchPerUserLoginLogs.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.logUserList = (action?.payload?.success) ? action.payload?.data : [];
        }).addCase(fetchPerUserLoginLogs.rejected, (state)=>{
            state.isLoading = false;
            state.logUserList = [];
        })

        .addCase(fetchProjectStats.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchProjectStats.fulfilled, (state, action)=>{
            state.isLoading = false;
            // console.log("list all proj stats : " ,action.payload);
            if (action?.payload?.success) {
              state.totalProjects = action.payload?.data?.totalProjects;
              state.completedProjects = action.payload?.data?.completedProjects;
              state.underConstruction = action.payload?.data?.underConstruction;
            }
        }).addCase(fetchProjectStats.rejected, (state)=>{
            state.isLoading = false;
        })

        .addCase(fetchUSerStats.pending, (state)=>{
            state.isLoading = true;
        }).addCase(fetchUSerStats.fulfilled, (state, action)=>{
            state.isLoading = false;
            console.log("list all proj stats : " ,action.payload);
            if (action?.payload?.success) {
              state.totalUsers = action.payload?.data?.totalUsers;
              state.adminsNo = action.payload?.data?.admins;
              state.editorUsers = action.payload?.data?.editorUsers;
              state.normalUsers = action.payload?.data?.normalUsers;
              state.verifiedUsers = action.payload?.data?.verifiedUsers;
              state.unverifiedUsers = action.payload?.data?.unverifiedUsers;
            }
        }).addCase(fetchUSerStats.rejected, (state)=>{
            state.isLoading = false;
        });

    }
});

export default analyticSlice.reducer;