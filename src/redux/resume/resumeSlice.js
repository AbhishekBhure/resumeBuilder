import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resumes: [],
  error: null,
  loading: false,
};

const resumeSlice = createSlice({
  name: "resume",
  initialState,
  reducers: {
    fetchResumeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchResumeSuccess: (state, action) => {
      state.loading = false;
      state.resumes = action.payload;
    },
    fetchResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addResumeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addResumeSuccess: (state, action) => {
      state.loading = false;
      state.resumes = action.payload;
    },
    addResumeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchResumeStart,
  fetchResumeSuccess,
  fetchResumeFailure,
  addResumeStart,
  addResumeSuccess,
  addResumeFailure,
} = resumeSlice.actions;

export default resumeSlice.reducer;
