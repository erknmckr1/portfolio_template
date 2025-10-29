import { createSlice } from "@reduxjs/toolkit";

type initialsValue = {
  language: string;
};

const initialState: initialsValue = {
  language: "tr",
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setChangeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});


export const {setChangeLanguage} = languageSlice.actions;
export default languageSlice.reducer