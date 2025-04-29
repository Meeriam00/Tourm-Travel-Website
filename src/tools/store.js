import { configureStore } from "@reduxjs/toolkit";
import { faqApi } from "./services/faqApi";
import { blogCategoryApi } from "./services/blogCategoryApi";
import { activityApi } from "./services/activityApi";
import { destinationApi } from "./services/destinationApi";
import { guiderApi } from "./services/guiderApi";
import { blogApi } from "./services/blogApi";
import { tripApi } from "./services/tripApi";


export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [faqApi.reducerPath]: faqApi.reducer, 
    [guiderApi.reducerPath]: guiderApi.reducer,
    [blogCategoryApi.reducerPath]: blogCategoryApi.reducer,
    [activityApi.reducerPath]: activityApi.reducer,
    [destinationApi.reducerPath]: destinationApi.reducer,
    [tripApi.reducerPath]: tripApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(blogApi.middleware)
     .concat(faqApi.middleware)
     .concat(guiderApi.middleware)
     .concat(blogCategoryApi.middleware)
     .concat(activityApi.middleware)
     .concat(destinationApi.middleware)
     .concat(tripApi.middleware),
     
});

export default store;




