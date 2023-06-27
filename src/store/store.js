import { configureStore } from "@reduxjs/toolkit";
import { authenticationAPI } from "../services/authenticationAPI";
import { userAPI } from "../services/userAPI";
import { settingsAPI } from "../services/settingsAPI";
import { staffAPI } from "../services/staffAPI";
import { customerAPI } from "../services/customerAPI";
import { expenseAPI } from "../services/expenseAPI";
import { inventoryAPI } from "../services/inventoryAPI";
import { adminAPI } from "../services/adminAPI";

export default configureStore({
  reducer: {
    [authenticationAPI.reducerPath]: authenticationAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [settingsAPI.reducerPath]: settingsAPI.reducer,
    [staffAPI.reducerPath]: staffAPI.reducer,
    [customerAPI.reducerPath]: customerAPI.reducer,
    [expenseAPI.reducerPath]: expenseAPI.reducer,
    [inventoryAPI.reducerPath]: inventoryAPI.reducer,
    [adminAPI.reducerPath]: adminAPI.reducer,
  },
});
