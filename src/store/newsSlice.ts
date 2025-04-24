import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IData_SnippetNews } from '@/types/news';
import { loadNewsData } from '@/utils/newsUtils';

interface NewsState {
  newsList: IData_SnippetNews[];
  favorites: number[]; // IDs избранных новостей
  currentNews: IData_SnippetNews | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: NewsState = {
  newsList: [],
  favorites: [],

  currentNews: null,
  status: 'idle',
  error: null,
};

export const fetchNews = createAsyncThunk('news/fetchNews', async (_, { rejectWithValue }) => {
  try {
    return await loadNewsData();
  } catch (err) {
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
    setNewsSuccess(state, action: PayloadAction<IData_SnippetNews[]>) {
      state.status = 'succeeded';
      state.newsList = action.payload;
    },
    setNewsFailed(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
    setCurrentNews(state, action: PayloadAction<IData_SnippetNews>) {
      state.currentNews = action.payload;
    },
    toggleFavorite(state, action: PayloadAction<number>) {
      const index = state.favorites.indexOf(action.payload);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
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
        state.error = action.payload as string;
      });
  },
});

export const { setNewsLoading, setNewsSuccess, setNewsFailed, setCurrentNews, toggleFavorite } =
  newsSlice.actions;

export default newsSlice.reducer;
