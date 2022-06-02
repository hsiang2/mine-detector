import { createSlice } from '@reduxjs/toolkit';

const initialState = {sliderValue: [0] };

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSlider: (state, action) => {
      state.sliderValue = action.payload;
    },
  },
});

export const selectSlider = (state) => state.slider.sliderValue;
export const { setSlider } = sliderSlice.actions;
export default sliderSlice.reducer;