import { IUser } from "@/interfaces/user";
import { setAuthToken } from "@/libs/api";
import { createSlice } from "@reduxjs/toolkit";

const initialAuthState: IUser = {
  id: 0,
  email: "",
  full_name: "",
  username: "",
  description: "",
  picture: "",
  followers_count: 0,
  followings_count: 0,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    AUTH_LOGIN: (state, action) => {
      const {
        id,
        email,
        full_name,
        username,
        description,
        picture,
        followers_count,
        followings_count,
      } = action.payload.user;

      const { token } = action.payload;

      setAuthToken(token);
      localStorage.setItem("token", token);

      state.id = id;
      state.email = email;
      state.full_name = full_name;
      state.username = username;
      state.description = description;
      state.picture = picture;
      state.followers_count = followers_count;
      state.followings_count = followings_count;
    },
    AUTH_CHECK: (state, action) => {
      const {
        id,
        email,
        full_name,
        username,
        description,
        picture,
        followers_count,
        followings_count,
      } = action.payload.user;

      state.id = id;
      state.email = email;
      state.full_name = full_name;
      state.username = username;
      state.description = description;
      state.picture = picture;
      state.followers_count = followers_count;
      state.followings_count = followings_count;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
