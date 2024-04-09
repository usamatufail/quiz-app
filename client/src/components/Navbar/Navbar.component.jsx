import { Typography, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from 'store/users/users.reducer';
import { MobileMenu } from './MobileMenu.component';
import './Navbar.styles.scss';

const { Title } = Typography;

export function Navbar({ user }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const handleSignout = async () => {
    dispatch(logout());
    navigate('/');
  };

  const links = user?._id
    ? [
        {
          path: '/',
          title: 'All Quizzes',
        },
        {
          path: '/my-quizzes',
          title: 'My Quizzes',
        },
        {
          onClick: handleSignout,
          title: `${user?.name} - Logout`,
        },
      ]
    : [
        { path: '/login', title: 'Login' },
        { path: '/signup', title: 'Sign Up' },
      ];

  const logoLink = '/';

  return (
    <nav className="navbar">
      <Link to={logoLink}>
        <Title level={3} style={{ marginBottom: 0 }}>
          Quiz Engine 1.0
        </Title>
      </Link>
      <div className="navbar__buttons hidden md:flex">
        {links?.map((link, index) => (
          <div key={index}>
            {link?.path ? (
              <Link to={link?.path}>
                <Button type="primary">{link?.title}</Button>
              </Link>
            ) : (
              <Button type="primary" onClick={link?.onClick}>
                {link?.title}
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="block md:hidden">
        <MobileMenu links={links} user={user} />
      </div>
    </nav>
  );
}
