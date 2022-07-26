import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer, // Dynamically applying reducer path. reducerPath can be renamed in apiSlice.js.
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})