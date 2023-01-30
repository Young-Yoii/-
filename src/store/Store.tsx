import { configureStore } from '@reduxjs/toolkit';
import backgroundReducer from './BackgroundSlice';
import LayoutReducer from './LayoutSlice';
import TextStyleReducer from './TextStyleSlice';

const store = configureStore({
  reducer: {
    background: backgroundReducer,
    layout: LayoutReducer,
    textStyle: TextStyleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
