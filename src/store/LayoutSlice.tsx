import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

type LayoutState = {
  showAllText: boolean,
  hideDescription: boolean,
  showOnlyTitle: boolean,
};

const initialState: LayoutState = {
  showAllText: true,
  hideDescription: false,
  showOnlyTitle: false,
}

export const LayoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    showAllText(state) {
      state.showAllText = true;
      state.hideDescription = false;
      state.showOnlyTitle = false;
    },
    hideDescription(state){
      state.hideDescription = true;
      state.showAllText = false;
      state.showOnlyTitle = false;
    },
    showOnlyTitle(state) {
      state.showOnlyTitle = true;
      state.showAllText = false;
      state.hideDescription = false;
    },
    resetLayout(state){
      Object.assign(state, initialState);
    }
  }
});

export const {showAllText, hideDescription, showOnlyTitle,resetLayout} = LayoutSlice.actions;
export default LayoutSlice.reducer;