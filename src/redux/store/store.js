import { configureStore } from "@reduxjs/toolkit";
import userRegister from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userRegister,
  },
});
