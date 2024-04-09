// Libraries
import { useEffect, Suspense } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

// Custom Stuff
import { pages } from 'pages';
import { Error404, Navbar, ProtectedRoute } from 'components';
import { loggedInUser } from 'store/users/user.actions';
import { logout } from 'store/users/users.reducer';
import { setupInterceptors } from 'config';
import store from './store';

const token = localStorage.getItem('AuthToken');

function App() {
  const { user } = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user && token) {
      dispatch(loggedInUser());
    } else if (!token) {
      dispatch(logout());
    }
  }, [dispatch]);

  const navigate = useNavigate();
  setupInterceptors({ navigate, store });

  return (
    <div>
      <ToastContainer />
      <Navbar user={user} />
      <Suspense
        fallback={
          <div className="custom-spinner-container">
            <Spin size="large" />
          </div>
        }
      >
        <div className="app">
          <Routes>
            {pages.map(({ path, Component, isAuthenticated }) => (
              <Route
                index={path === '/'}
                path={path}
                key={path}
                element={
                  <>
                    {isAuthenticated ? (
                      <ProtectedRoute>
                        <Component />
                      </ProtectedRoute>
                    ) : (
                      <Component />
                    )}
                  </>
                }
              />
            ))}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
