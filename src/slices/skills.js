// /slices/skills.js
import { createSlice } from "@reduxjs/toolkit";

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    search: "",
  },
  reducers: {
    searchSkillsRequest: (state) => {
      // searchSkillsRequest: (state, action) => {
      state.isLoading = true;
      state.error = null;
    },
    searchSkillsSuccess: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    searchSkillsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    changeSearchField: (state, action) => {
      state.search = action.payload.search;
      if (action.payload.search === "") {
        state.items = [];
      }
    },
  },
});

export const {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  changeSearchField,
} = skillsSlice.actions;

export default skillsSlice.reducer;
