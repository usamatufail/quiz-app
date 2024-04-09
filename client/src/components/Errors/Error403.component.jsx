import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import './styles.scss';

export function Error403() {
  return (
    <div className="error-page">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized."
        extra={
          <Link to="/login">
            <Button type="primary">Login</Button>
          </Link>
        }
      />
    </div>
  );
}
