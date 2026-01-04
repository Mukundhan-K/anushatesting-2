import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminProductReducer from "./adminSlice";
import adminUserReducer from "./adminuserSlice";

const store = configureStore({
    reducer : {
        authReducer,
        adminProductReducer,
        adminUserReducer
    }
});

export default store;