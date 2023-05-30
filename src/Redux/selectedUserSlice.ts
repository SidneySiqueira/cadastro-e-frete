import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface UserState {
  username?: string;
  id?: string;
  password: boolean;
  email: string;
  selectUser:
    | {
        id: string;
        username: string;
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        password: string;
        userStatus: number;
      }
    | [];
}

const initialState: UserState = {
  selectUser: {
    id: uuidv4(),
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: '',
    userStatus: 2,
  },
  password: false,
  email: ''
};

const selectUserSlice = createSlice({
  name: "selectUser",
  initialState,
  reducers: {
    setSelectedUser(state, action: PayloadAction<any>) {
      state.selectUser = action.payload;
    },
    removeSelected(state) {
      state.selectUser = [];
    },
  },
});

export const { setSelectedUser, removeSelected } =
selectUserSlice.actions;

export default selectUserSlice.reducer;
