import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../api/api";

export const getAllCategories = createAsyncThunk(
  'app/categories',
  async (userId, thunkAPI) => {
    
    const categories = await axios.get(`${URL}/categories`)
    return categories.data
  }
);

export const getAllColors = createAsyncThunk(
  'app/colors',
  async (userId, thunkAPI) => {
    const colors = await fetch(`${URL}/colors`).then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(error => {
        const e = new Error('Smth gone wrong')
        e.data = error
        throw e
      })
    });

    return colors
  }
);

export const getFavoriten = createAsyncThunk(
  'app/favoriten',
  async (userId, thunkAPI) => {
    const favorites = await fetch(`${URL}/api/product/fav/${userId}`).then(response => {
      if (response.ok) {
        return response.json()
      }

      return response.json().then(error => {
        const e = new Error('Smth gone wrong')
        e.data = error
        throw e
      })
    });

    return favorites
  }
);

const myStorage = window.localStorage;

const appSlice = createSlice({
  name: 'app',
  initialState: {
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null,
    isAdmin: localStorage.getItem('isAdmin') || false,
    email: localStorage.getItem('email') || '',
    favorite: [],
    loading: false,
    allColors: [],
    allCategories: []
  },
  reducers: {
    changeUserRole(state, { payload }) {
      state.isAdmin = payload;
      myStorage.setItem('isAdmin', payload)
    },
    changeUserEmail(state, { payload }) {
      state.email = payload;
      myStorage.setItem('email', payload)
    },
    logout(state) {
      state.favorite = [];
      state.userId = null;
      localStorage.removeItem('userId');
      state.token = null;
      localStorage.removeItem('token');
      state.email = '';
      localStorage.removeItem('email');
      state.isAdmin = false
      localStorage.removeItem('isAdmin');
    },
    changeLoading(state, { payload }) {
      state.loading = payload;
    },
    changeUserId(state, { payload }) {
      state.userId = payload;
      myStorage.setItem('userId', payload)
    },
    changeToken(state, { payload }) {
      state.token = payload;
      myStorage.setItem('token', payload)
    },

  },
  extraReducers: builder => {
    builder.addCase(getFavoriten.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllColors.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getAllCategories.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getFavoriten.fulfilled, (state, { payload: data }) => {
      state.favorite = data;
      state.loading = false;
    })
    builder.addCase(getAllColors.fulfilled, (state, { payload: data }) => {
      state.allColors = data;
      state.loading = false;
    })
    builder.addCase(getAllCategories.fulfilled, (state, { payload: data }) => {
      state.allCategories = data;
      state.loading = false;
    })
  }
})

export default appSlice.reducer

export const { changeUserRole, changeUserEmail, logout, changeLoading, changeUserId, changeToken } = appSlice.actions