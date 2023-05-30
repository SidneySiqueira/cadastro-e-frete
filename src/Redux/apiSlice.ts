import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserState } from "./selectedUserSlice";

interface Api {
  users: UserState[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Props {
  item: string;
  patchData: UserState;
}

const initialState: Api = {
  users: [],
  status: "idle",
  error: null,
};

const url = "https://frontend-test.frenet.dev/v1";

export const fetchApi = createAsyncThunk("api/fetch", async () => {
  const response = await axios.get(`${url}/user/sidney`);
  return response.data;
});

export const AddApi = createAsyncThunk(
  "api/post",
  async (postData: UserState) => {
    console.log("postDataPost", postData);

    const response = await axios.post(`${url}/user`, postData);
    console.log("responsePost", response);
    
    return response.data;
  }
);

export const updateApi = createAsyncThunk(
  "api/update",
  async ({ patchData }: Props, {}) => {
    console.log("updateApi", patchData);
    
    const response = await axios.put(
      `${url}/user/${patchData.username}`,
      patchData
    );
    return response.data;
  }
);

export const deleteApi = createAsyncThunk(
  "api/delete",
  async (itemId: string) => {
    await axios.delete(`${url}/user/${itemId}`);
    return itemId;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Algo deu errado.";
      })
      .addCase(AddApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(AddApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Algo deu errado.";
      })
      .addCase(updateApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = Object.values(action.payload);
        const index = state.users.findIndex(
          (user) => (user as UserState).id === action.payload.id
        );
        state.users[index] = action.payload;
      })
      .addCase(updateApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Algo deu errado.";
      })
      .addCase(deleteApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        const usersArray = Object.values(action.payload);
        if (Array.isArray(state.users)) {
          state.users = state.users.filter((user) => {
            return !usersArray.some(
              (deletedUsers) =>
                (deletedUsers as unknown as UserState).id === user.id
            );
          });
        }
      })
      .addCase(deleteApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Algo deu errado.";
      });
  },
});

export default apiSlice.reducer;
