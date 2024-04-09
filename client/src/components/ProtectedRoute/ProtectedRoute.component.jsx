import { Spin } from 'antd';
import { Error403 } from 'components';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
  const { user, initialLoading } = useSelector((state) => state?.user);

  if (initialLoading) {
    return (
      <div className="h-[calc(100vh_-_100px)] w-full flex items-center justify-center">
        <Spin size="large" spinning />{' '}
      </div>
    );
  }

  if (!user && !initialLoading) {
    return <Error403 />;
  }
  return children;
}
