import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../services/cryptoAPI";
import { NewsApi } from "../services/newsAPI";
export default configureStore(
    {
        reducer: {
            [cryptoApi.reducerPath]: cryptoApi.reducer,
            [NewsApi.reducerPath]: NewsApi.reducer,
        },
    }
);