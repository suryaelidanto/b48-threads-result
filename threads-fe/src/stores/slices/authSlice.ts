import { IUser } from "@/interfaces/user";
import { setAuthToken } from "@/libs/api";
import { createSlice } from '@reduxjs/toolkit'


const initialAuthState: IUser = {
    id: 0,
    email: "",
    full_name: "",
    username: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        AUTH_LOGIN: (_, action) => {
            const payload = action.payload
            console.log("redux auth login:", payload)
            // console.log("ini data usermu bro:", payload.user)
            setAuthToken(payload.token)
            localStorage.setItem("token", payload.token)

            const user: IUser = {
                id: payload.user.id,
                full_name: payload.user.full_name,
                username: payload.user.username,
                email: payload.user.email,
            };

            return user
        },
        AUTH_CHECK: (_, action) => {
            const payload = action.payload
            console.log("redux auth check :", payload)
            // console.log("ini data usermu bro:", payload.user)

            const user: IUser = {
                id: payload.id,
                full_name: payload.full_name,
                username: payload.username,
                email: payload.email,
            };

            return user
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
        }
    }
})