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
    AUTH_LOGIN: (_, action) => {
      const payload = action.payload;
      setAuthToken(payload.token);
      localStorage.setItem("token", payload.token);

      const user: IUser = {
        id: payload.user.id,
        email: payload.user.email,
        full_name: payload.user.full_name,
        username: payload.user.username,
        description: payload.user.description,
        picture: payload.user.picture,
        followers_count: payload.user.followers_count,
        followings_count: payload.user.followings_count,
      };

      return user;
    },
    AUTH_CHECK: (_, action) => {
      const payload = action.payload;

      const user: IUser = {
        id: payload.user.id,
        email: payload.user.email,
        full_name: payload.user.full_name,
        username: payload.user.username,
        description: payload.user.description,
        picture: payload.user.picture,
        followers_count: payload.user.followers_count,
        followings_count: payload.user.followings_count,
      };


      return user;
    },
    AUTH_ERROR: () => {
      localStorage.removeItem("token");
    },
    AUTH_LOGOUT: () => {
      localStorage.removeItem("token");
    },
  },
});
