import { IThreadCard } from "@/interfaces/thread";
import { createSlice, current } from "@reduxjs/toolkit";

const initialThreadState: IThreadCard[] = [];

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (_, action) => {
      console.log("ini data threads", action.payload);
      return action.payload;
    },
    SET_LIKE: (state, action) => {
      // console.log("data current state", currentState);
      // return currentState;
    },
  },
});
