import { IThreadCard } from "@/interfaces/thread";
import { createSlice } from "@reduxjs/toolkit";

const initialThreadState: IThreadCard[] = [];

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (_, action) => {
      return action.payload;
    },
  },
});
