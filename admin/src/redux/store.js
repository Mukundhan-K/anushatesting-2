import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminProductReducer from "./adminSlice";

const store = configureStore({
    reducer : {
        authReducer,
        adminProductReducer,
    }
});

export default store;