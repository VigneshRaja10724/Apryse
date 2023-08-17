import { configureStore } from "@reduxjs/toolkit";
import { ThumbnailPages } from "./Reducers/ThumbnailPages";


export const store = configureStore({
  reducer: {
    ThumbnailPages: ThumbnailPages.reducer,
  },
//   middleware : (getDefaultMiddleware) => getDefaultMiddleware({ // to get the object no serilized from the server making it false
//     serializableCheck : false
//   })
});

export type RootState = ReturnType<typeof store.getState>; //used to get the data from the store
export type AppDispatch = typeof store.dispatch;
