import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import { useDispatch } from 'react-redux';
export const store = configureStore({
    reducer: {
        news: newsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});
export const useAppDispatch = () => useDispatch();
