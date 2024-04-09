import { lazy } from 'react';

export const pages = [
  {
    path: '/',
    Component: lazy(() => import('./AllQuizzes/AllQuizzes.page')),
    isAuthenticated: false,
  },
  {
    path: '/quiz/:permalink',
    Component: lazy(() => import('./Quiz/Quiz.page')),
    isAuthenticated: false,
  },
  {
    path: '/my-quizzes/*',
    Component: lazy(() => import('./MyQuiz/MyQuiz.page')),
    isAuthenticated: true,
  },
  {
    path: '/login',
    Component: lazy(() => import('./Login/Login.page')),
    isAuthenticated: false,
  },
  {
    path: '/signup',
    Component: lazy(() => import('./Signup/Signup.page')),
    isAuthenticated: false,
  },
];
