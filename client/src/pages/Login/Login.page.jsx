import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';
import { Typography, Spin } from 'antd';

import loginAnimationData from 'animations/login.json';
import { Form } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'store/users/user.actions';
import './Login.styles.scss';
import { signinValidation } from 'validations';

const initialValues = {
  email: '',
  password: '',
};

const loginFields = [
  {
    title: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Please enter your email...',
  },
  {
    title: 'Password',
    name: 'password',
    type: 'password',
    placeholder: 'Please enter your password...',
  },
];

export default function Login() {
  const { loading, user } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (user?._id) {
      navigate('/my-quizzes');
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login__left">
        <Lottie animationData={loginAnimationData} loop autoPlay />
      </div>
      <div className="login__right">
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Typography.Title level={2} className="login__right-heading">
              Login
            </Typography.Title>
            <Form
              initialValues={initialValues}
              validationSchema={signinValidation}
              fields={loginFields}
              submitText="Login"
              onSubmit={onSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
