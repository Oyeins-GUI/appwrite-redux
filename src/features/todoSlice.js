import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { account, ID } from "../lib/appwrite";

const initialState = {
   isLoading: false,
   data: [],
   isError: false,
};

const todoSlice = createSlice({
   name: "todo",
   initialState,
   extraReducers: (builder) => {
      builder.addCase(fetchTodos.pending, (state, action) => {
         state.isLoading = true;
      });
      builder.addCase(fetchTodos.fulfilled, (state, action) => {
         state.isLoading = false;
         state.data = action.payload;
      });
      builder.addCase(fetchTodos.rejected, (state, action) => {
         state.isError = true;
      });
   },
});

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
   const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
   return res?.json();
});

export default todoSlice.reducer;
