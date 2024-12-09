import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    categoryList: []
};

// Fetch category
export const viewCategory = createAsyncThunk('category/viewCategory', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
    return response.data;
});

// Add category
export const addCategory = createAsyncThunk('category/addCategory', async (data) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/category`, data);
    return response.data;
});

// Update category
export const updateCategory = createAsyncThunk('category/updateCategory', async (data) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/category/${data.id}`, data);
    return response.data;
});

// Delete category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
    return id;
});

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state, action) => {
                state.categoryList = action.payload;
            })
            .addCase(viewCategory.fulfilled, (state, action) => {
                state.categoryList.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.categoryList.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categoryList[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.categoryList = state.categoryList.filter(category => category.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;