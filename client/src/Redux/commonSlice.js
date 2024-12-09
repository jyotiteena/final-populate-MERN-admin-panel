import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/apiRequest';

const initialState = {
    apiData: {},
    loading: false,
    error: null,
};

// Dynamic Async Thunk
export const fetchData = createAsyncThunk('dynamic/fetchData', async ({ model, method, data, id }) => {
    const url = id ? `/${model}/${id}` : `/${model}`;
    
    return await apiRequest({ method, url, data });
});

const dynamicSlice = createSlice({
    name: 'dynamic',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                const { model, method, id } = action.meta.arg;
                if (method === 'GET' && !id) {
                    state.apiData[model] = action.payload; // Fetch all
                } else if (method === 'GET' && id) {
                    state.apiData[model] = state.apiData[model].map(item => item.id === id ? action.payload : item);
                } else if (method === 'POST') {
                    state.apiData[model] = [...(state.apiData[model] || []), action.payload];
                } else if (method === 'PUT') {
                    state.apiData[model] = state.apiData[model].map(item => item.id === id ? action.payload : item);
                } else if (method === 'DELETE') {
                    state.apiData[model] = state.apiData[model].filter(item => item.id !== id);
                }
                state.loading = false;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default dynamicSlice.reducer;
