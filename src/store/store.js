import { configureStore } from "@reduxjs/toolkit";
import { authenticationAPI } from "../services/authenticationAPI";
import { bookrAPI } from "../services/bookrAPI";

export default configureStore({
  reducer: {
    [authenticationAPI.reducerPath]: authenticationAPI.reducer,
    [bookrAPI.reducerPath]: bookrAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authenticationAPI.middleware, bookrAPI.middleware]),
});
