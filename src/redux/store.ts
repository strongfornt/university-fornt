import { configureStore } from "@reduxjs/toolkit";
import { instantMessageApi } from "./features/intstantMessaging/baseApi";

export const store = configureStore({
    reducer: {
        [instantMessageApi.reducerPath] : instantMessageApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instantMessageApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;