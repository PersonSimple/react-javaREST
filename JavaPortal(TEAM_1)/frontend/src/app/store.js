import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import courseReducer from '../features/course/courseSlice'
import studentReducer from '../features/student/studentSlice'
export const store = configureStore({
  reducer: {
    auth:authReducer,
    course:courseReducer,
    student:studentReducer,
  },
});
