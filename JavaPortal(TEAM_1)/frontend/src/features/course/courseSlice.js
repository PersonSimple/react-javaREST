import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCourseById, fetchCourses, updateCourseById } from "./courseAPI";

const initialState = {
  value: 0,
  status: "idle",
  courses: [],
  selectcourse: null,
};

export const fetchCoursesAsync = createAsyncThunk(
  "course/fetchCourseList",
  async () => {
    const response = await fetchCourses();
    return response.data;
  }
);
export const fetchCourseByIdAsync = createAsyncThunk(
  "course/fetchCourseById",
  async (id) => {
    const response = await fetchCourseById(id);
    return response.data;
  }
);
export const updateCourseByIdAsync = createAsyncThunk(
  "course/updateCourseById",
  async ({ data, id }) => {
   
    const response = await updateCourseById(data, id);

    return response.data;
  }
);

export const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCoursesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoursesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.courses = action.payload;
      })
      .addCase(fetchCourseByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectcourse = action.payload;
      })
      .addCase(updateCourseByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCourseByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectcourse = action.payload;
      });
  },
});

export const selectCourses = (state) => state.course.courses;
export const selectCourseById = (state) => state.course.selectcourse;
export default courseSlice.reducer;
