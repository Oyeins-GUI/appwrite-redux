import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "../lib/appwrite";

const initialState = {
   user: null,
   authState: "",
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(loginSync.pending, () => {
         console.log("login in...");
      });
      builder.addCase(loginSync.fulfilled, (state, action) => {
         console.log(action.payload);
      });
   },
});

export const signUpSync = createAsyncThunk("signup", async (name, email) => {
   return await account.create(ID.unique, email, name);
});

export const loginSync = createAsyncThunk("login", async () => {
   await account.createEmailSession();
   return account.get();
});

export default authSlice.reducer;
