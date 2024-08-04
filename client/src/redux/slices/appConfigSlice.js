import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";

export const depositHistory = createAsyncThunk(
  "depositHistory",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.get("transaction/depositHistory");
      return result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const withdrawalHistory = createAsyncThunk(
  "withdrawalHistory",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("transaction/withdrawalHistory");
      return response;
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
export const sellusdtHistory = createAsyncThunk(
  "sellusdtHistory",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.get("transaction/sellusdtHistory");
      // console.log(response);
      return response;
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const userBankAcoounts = createAsyncThunk(
  "userBankAccounts",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const result = await axiosClient.get("transaction/bankaccounts");
      return result;
    } catch (e) {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const getUserData = createAsyncThunk(
  "getUserData",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      const response = await axiosClient.post("/auth/user");
      return response;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

const appConfigeSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,
    userData: null,
    // userDepositHistory: null,
    // userWithdrawalHistory: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.config = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload.result[0];
    });
  },
  // extraReducers: (builder) => {
  //   builder.addCase(depositHistory.fulfilled, (state, action) => {
  //     state.userDepositHistory = action.payload.result[0];
  //   });
  // },
  // extraReducers: (builder) => {
  //   builder.addCase(withdrawalHistory.fulfilled, (state, action) => {
  //     state.userWithdrawalHistory = action.payload.result[0];
  //   });
  // },
});

// console.log(userData);

export default appConfigeSlice.reducer;
export const { setLoading } = appConfigeSlice.actions;
