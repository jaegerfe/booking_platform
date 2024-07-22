import { configureStore } from "@reduxjs/toolkit"
import propertiesSlice from "./propertiesSlice";
import bookingsSlice from "./bookingsSlice";

export const store = configureStore({
    reducer: {
        properties: propertiesSlice,
        bookings: bookingsSlice,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
