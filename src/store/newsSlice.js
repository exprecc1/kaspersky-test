import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loadNewsData } from '@/utils/newsUtils';
const initialState = {
    newsList: [],
    favorites: [],
    currentNews: null,
    status: 'idle',
    error: null,
};
export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { rejectWithValue }) => {
    try {
        return await loadNewsData();
    }
    catch (err) {
        return rejectWithValue(err instanceof Error ? err.message : 'Unknown error');
    }
});
const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setNewsLoading(state) {
            state.status = 'loading';
        },
        setNewsSuccess(state, action) {
            state.status = 'succeeded';
            state.newsList = action.payload;
        },
        setNewsFailed(state, action) {
            state.status = 'failed';
            state.error = action.payload;
        },
        setCurrentNews(state, action) {
            state.currentNews = action.payload;
        },
        toggleFavorite(state, action) {
            const index = state.favorites.indexOf(action.payload);
            if (index >= 0) {
                state.favorites.splice(index, 1);
            }
            else {
                state.favorites.push(action.payload);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
            state.status = 'loading';
        })
            .addCase(fetchNews.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.newsList = action.payload;
        })
            .addCase(fetchNews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    },
});
export const { setNewsLoading, setNewsSuccess, setNewsFailed, setCurrentNews, toggleFavorite } = newsSlice.actions;
export default newsSlice.reducer;
