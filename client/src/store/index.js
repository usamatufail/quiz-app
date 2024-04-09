import { configureStore } from '@reduxjs/toolkit';
import user from './users/users.reducer';
import quiz from './quiz/quiz.reducer';

const store = configureStore({
  reducer: {
    quizzes: quiz,
    user,
  },
});

export default store;
