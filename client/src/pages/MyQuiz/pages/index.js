import { lazy } from 'react';

export const pages = [
  { path: '/add', Component: lazy(() => import('./AddQuiz.page')) },
  { path: '/edit/:qid', Component: lazy(() => import('./EditQuiz.page')) },
  { path: '/', Component: lazy(() => import('./MyQuiz.page')) },
];
