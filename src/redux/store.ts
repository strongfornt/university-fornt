import { configureStore } from "@reduxjs/toolkit";
import { instantMessageApi } from "./features/intstantMessaging/baseApi";
import instantReducer from "./features/intstantMessaging/instantSlice"

export const store = configureStore({
    reducer: {
        [instantMessageApi.reducerPath] : instantMessageApi.reducer,
        cache:instantReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(instantMessageApi.middleware),
})


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch