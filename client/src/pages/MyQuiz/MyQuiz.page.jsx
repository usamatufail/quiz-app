import { Route, Routes } from 'react-router-dom';
import { pages } from './pages';

export default function MyQuizzes() {
  return (
    <Routes>
      {pages.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
    </Routes>
  );
}
