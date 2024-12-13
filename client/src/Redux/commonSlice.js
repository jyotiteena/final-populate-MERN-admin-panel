import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../utils/apiRequest';

const initialState = {
    apiData: {},
    loading: false,
    error: null,
};

// Dynamic Async Thunk
// export const fetchData = createAsyncThunk('dynamic/fetchData', async ({ model, method, data, id }) => {
//     const url = id ? `/${model}/${id}` : `/${model}`;

//     return await apiRequest({ method, url, data });
// });

export const fetchData = createAsyncThunk('dynamic/fetchData', async ({ model, method, data, id }) => {
    const url = id ? `/${model}/${id}` : `/${model}`;
    let config = {};

    if (data instanceof FormData) {
        config.headers = { 'Content-Type': 'multipart/form-data' };
    }

    return await apiRequest({ method, url, data, ...config });
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
                const result = action.payload;
                if (!Array.isArray(state.apiData[model])) {
                    state.apiData[model] = [];
                }

                if (method === 'GET' && !id) {
                    state.apiData[model] = Array.isArray(result) ? result : [result];
                } else if (method === 'GET' && id) {
                    const index = state.apiData[model].findIndex(item => item.id === id);
                    if (index !== -1) {
                        state.apiData[model][index] = result;
                    } else {
                        state.apiData[model].push(result);
                    }
                } else if (method === 'POST') {
                    state.apiData[model].push(result);
                } else if (method === 'PUT') {
                    const index = state.apiData[model].findIndex(item => item.id === id);
                    if (index !== -1) {
                        state.apiData[model][index] = result;
                    }
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
