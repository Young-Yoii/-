import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

type textStyleState = {
  color: string,
  shadow: boolean,
  titleSize: number,
  subTitleSize: number,
  descriptionSize:number,
};

const initialState: textStyleState = {
  color: '#000000',
  shadow: false,
  titleSize: 45,
  subTitleSize: 25,
  descriptionSize: 20,
}

export const textStyleSlice = createSlice({
  name: 'textStyle',
  initialState,
  reducers: {
    changeColor(state, action: PayloadAction<string>) {
      state.color = action.payload;
    },
    setFontColor(state,action: PayloadAction<string>){
      state.color = action.payload;
    },
    setShadow(state) {
      state.shadow = !state.shadow;
    },
    setTitleSize(state, action: PayloadAction<number>) {
      state.titleSize = action.payload;
    },
    setSubTitleSize(state, action: PayloadAction<number>) {
      state.subTitleSize = action.payload;
    },
    setDescribtionSize(state, action: PayloadAction<number>) {
      state.descriptionSize = action.payload;
    }
  }
});

export const { 
  changeColor, 
  setFontColor, 
  setShadow, 
  setTitleSize, 
  setSubTitleSize, 
  setDescribtionSize 
} = textStyleSlice.actions;
export default textStyleSlice.reducer;