import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
   createAccount,
   loginUser,
   logoutUser,
   getCurrentUser,
   getAvatarInitials,
} from "../../appwrite/auth";

const initialState = {
   status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
   isUserLoggedIn: false,
   userData: null,
   error: "",
   signupError: "",
   loginError: "",
   logoutError: "",
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(signup.pending, (state) => {
            state.status = "loading";
         })
         .addCase(signup.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.signupError = "";
            state.isUserLoggedIn = true;
            state.userData = action.payload;
         })
         .addCase(signup.rejected, (state, action) => {
            state.status = "failed";
            state.isUserLoggedIn = false;
            state.userData = null;
            state.signupError = action.error.message;
         })
         .addCase(login.pending, (state) => {
            state.status = "loading";
         })
         .addCase(login.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.loginError = "";
            state.isUserLoggedIn = true;
            state.userData = action.payload;
         })
         .addCase(login.rejected, (state, action) => {
            state.status = "failed";
            state.isUserLoggedIn = false;
            state.userData = null;
            state.loginError = action.error.message;
         });
   },
});

export const signup = createAsyncThunk(
   "auth/signup",
   async ({ email, password, name }) => {
      const session = await createAccount({
         email,
         password,
         name,
      });
      if (session) {
         const response = await getCurrentUser();
         if (response) {
            const avatar = getAvatarInitials(response.name);
            return { ...response, avatar };
         }
      }
   }
);

export const login = createAsyncThunk(
   "auth/login",
   async ({ email, password }) => {
      const session = await loginUser({ email, password });
      if (session) {
         const response = await getCurrentUser();
         if (response) {
            const avatar = getAvatarInitials(response.name);
            return { ...response, avatar };
         }
      }
   }
);

export const logout = createAsyncThunk("auth/logout", async () => {
   await logoutUser();
});

export default authSlice.reducer;
