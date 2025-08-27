import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// базовый URL твоего backend
const API = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://zenbit-tech.onrender.com",
});

// Установка токена в axios
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// Асинхронные действия для регистрации
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/register", userData);
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // сохраняем user
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data || { message: err.message });
    }
  }
);

// Асинхронные действия для логина
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/login", userData);
      setAuthToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user)); // сохраняем user
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data || { message: err.message });
    }
  }
);

// Загружаем user и token из localStorage при инициализации
const initialToken = localStorage.getItem("token");
const initialUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

if (initialToken) {
  setAuthToken(initialToken); // устанавливаем токен в axios
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,   // подгружаем user из localStorage
    token: initialToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      setAuthToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // удаляем user
    },
  },
  extraReducers: (builder) => {
    builder
      // регистрация
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // логин
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
