import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminProductReducer from "./adminSlice";
import adminUserReducer from "./adminuserSlice";
import analyticReducer from "./analyticSlice";

const store = configureStore({
    reducer : {
        authReducer,
        adminProductReducer,
        adminUserReducer,
        analyticReducer
    }
});

export default store;