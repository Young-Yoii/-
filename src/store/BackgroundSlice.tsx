import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

type bacgroundState = {
  color: string,
  rgb: string,
  img: string,
  isImg : boolean,
};

const initialState: bacgroundState = {
  color: '#dece56',
  rgb: '',
  img:'',
  isImg: false,
}

export const backgroundSlice = createSlice({
  name: 'background',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    oneColor(state,action: PayloadAction<string>){
      state.color = action.payload;
      state.rgb = initialState.rgb;
      state.img = '';
      state.isImg = false;
    },
    gradient(state, action: PayloadAction<string>) {
      state.rgb = action.payload;
      state.img = initialState.img;
      state.isImg = false;
    },
    getImage(state, action: PayloadAction<string>) {
      state.img = action.payload;
      state.isImg = true;
    },
    resetBg(state){
      Object.assign(state, initialState);
    },
  }
});

export const {oneColor, gradient, changeColor, getImage, resetBg} = backgroundSlice.actions;
export default backgroundSlice.reducer;