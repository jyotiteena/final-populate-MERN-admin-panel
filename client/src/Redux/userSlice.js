import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    category: []
};

// Fetch category
export const viewCategory = createAsyncThunk('category/viewCategory', async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
    return response.data;
});

// Add category
export const addCategory = createAsyncThunk('category/addCategory', async (newTodo) => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/category`, newTodo);
    return response.data;
});

// Update category
export const updateCategory = createAsyncThunk('category/updateCategory', async (updatedTodo) => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/category/${updatedTodo.id}`, updatedTodo);
    return response.data;
});

// Delete category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`);
    return id;
});

const todoSlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCategory.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(viewCategory.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            });
    },
});

export default todoSlice.reducer;