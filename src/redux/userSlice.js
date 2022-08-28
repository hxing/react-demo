import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userName: null,
        version: null
    },
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload.userName;
            state.version = action.payload.version ?? state.version;
        }
    }
});

export const {setUserName} = userSlice.actions;
export default userSlice.reducer;
