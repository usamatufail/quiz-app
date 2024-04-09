import { createSlice } from '@reduxjs/toolkit';
import {
  createQuiz,
  deleteQuiz,
  editQuiz,
  getAllQuizes,
  getQuizByID,
  getQuizByPermalink,
  getUserQuizzes,
  publishQuiz,
} from './quiz.actions';

const initialState = {
  quizzes: [],
  myQuizzes: [],
  quiz: null,
  loading: false,
};

export const quizSlice = createSlice({
  initialState,
  name: 'quizSlice',
  reducers: {},
  extraReducers(builder) {
    builder
      // Get All Quizzes
      .addCase(getAllQuizes.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getAllQuizes.fulfilled, (state, { payload }) => ({
        ...state,
        quizzes: payload,
        loading: false,
      }))
      .addCase(getAllQuizes.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Get Users Quizzes
      .addCase(getUserQuizzes.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserQuizzes.fulfilled, (state, { payload }) => ({
        ...state,
        myQuizzes: payload,
        loading: false,
      }))
      .addCase(getUserQuizzes.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Create Quiz
      .addCase(createQuiz.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(createQuiz.fulfilled, (state, { payload }) => ({
        ...state,
        myQuizzes: [...state.myQuizzes, payload],
        loading: false,
      }))
      .addCase(createQuiz.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Publish Quiz
      .addCase(publishQuiz.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(publishQuiz.fulfilled, (state, { payload }) => {
        const allMyQuizzes = state?.myQuizzes?.filter(
          (q) => q?._id !== payload?._id
        );
        const newQuizzes = [...allMyQuizzes, payload];

        return {
          ...state,
          myQuizzes: newQuizzes,
          loading: false,
        };
      })
      .addCase(publishQuiz.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Edit Quiz
      .addCase(editQuiz.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(editQuiz.fulfilled, (state, { payload }) => {
        const allMyQuizzes = state?.myQuizzes?.filter(
          (q) => q?._id !== payload?._id
        );
        const newQuizzes = [...allMyQuizzes, payload];

        return {
          ...state,
          myQuizzes: newQuizzes,
          loading: false,
        };
      })
      .addCase(editQuiz.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Delete Quiz
      .addCase(deleteQuiz.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(deleteQuiz.fulfilled, (state, { payload }) => ({
        ...state,
        myQuizzes: state?.myQuizzes?.filter(
          (quiz) => quiz?._id !== payload?.id
        ),
        loading: false,
      }))
      .addCase(deleteQuiz.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Get Quiz By ID
      .addCase(getQuizByID.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getQuizByID.fulfilled, (state, { payload }) => ({
        ...state,
        quiz: payload,
        loading: false,
      }))
      .addCase(getQuizByID.rejected, (state) => ({
        ...state,
        loading: false,
      }))
      // Get Quiz By Permalink
      .addCase(getQuizByPermalink.pending, (state) => ({
        ...state,
        loading: true,
      }))
      .addCase(getQuizByPermalink.fulfilled, (state, { payload }) => ({
        ...state,
        quiz: payload,
        loading: false,
      }))
      .addCase(getQuizByPermalink.rejected, (state) => ({
        ...state,
        loading: false,
      }));
  },
});
const { reducer } = quizSlice;

export default reducer;
