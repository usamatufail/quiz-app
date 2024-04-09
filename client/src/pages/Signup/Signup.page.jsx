import { useEffect } from 'react';
import Lottie from 'lottie-react';
import { Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Form } from 'components';
import { signupValidation } from 'validations';
import signupAnimationData from 'animations/signup.json';
import { registerUser } from 'store/users/user.actions';
import './Signup.styles.scss';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const signupFields = [
  {
    title: 'Name',
    name: 'name',
    type: 'text',
    placeholder: 'Please enter your name...',
  },
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

export default function Signup() {
  const { loading, user } = useSelector((state) => state?.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = async (values) => {
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if (user?._id) {
      navigate('/my-quizzes');
    }
  }, [user]);

  return (
    <div className="signup">
      <div className="signup__left">
        <Lottie animationData={signupAnimationData} loop autoPlay />
      </div>
      <div className="signup__right">
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Typography.Title level={3} className="signup__right-heading">
              Signup using your email & password
            </Typography.Title>
            <Form
              initialValues={initialValues}
              validationSchema={signupValidation}
              fields={signupFields}
              submitText="Signup"
              onSubmit={onSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}
