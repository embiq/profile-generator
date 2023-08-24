import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const anchorSlice = createSlice({
  name: "anchor",
  initialState: { value: "" },
  reducers: {
    setAnchor: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setAnchor } = anchorSlice.actions;

export default anchorSlice.reducer;
