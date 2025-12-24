import { configureStore } from "@reduxjs/toolkit";

import shopProductReducer from "./shopSlice";

const store = configureStore({
    reducer : {
        shopProductReducer
    }
});

export default store;