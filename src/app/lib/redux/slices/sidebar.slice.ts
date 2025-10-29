import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen: boolean;
};

const initialState: SidebarState = {
  isOpen: true, // varsayılan açık
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    // toggle (aç/kapa)
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    // dışarıdan payload ile set etme
    setSidebarState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarState,
} = sidebarSlice.actions;

export default sidebarSlice.reducer;
