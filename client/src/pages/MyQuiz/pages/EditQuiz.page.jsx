import { useEffect } from 'react';
import { Button, Spin } from 'antd';
import { Formik } from 'formik';
import { Form } from 'formik-antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { quizValidation } from 'validations';
import { CustomInput } from 'components';
import { editQuiz, getQuizByID } from 'store/quiz/quiz.actions';
import { Questions } from './sections/Questions.section';

const initialValues = {
  title: '',
  questions: [],
};

export default function EditQuiz() {
  const { loading, quiz } = useSelector((state) => state?.quizzes);
  const { qid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizByID(qid));
  }, []);

  const navigate = useNavigate();

  return (
    <div className="max-w-[1366px] ml-[auto] mr-[auto]">
      <Spin spinning={loading}>
        <h1 className="text-center mt-[32px]">Edit Quiz</h1>
        <div className="max-w-[1200px] ml-[auto] mr-[auto] shadow-lg border-[1px] border-[#fafafa] rounded-md mt-5 w-full p-[30px]">
          <Formik
            initialValues={quiz ? { ...quiz } : initialValues}
            enableReinitialize
            onSubmit={async (values) => {
              const finalValues = {
                ...values,
                isPublished: false,
              };
              dispatch(editQuiz({ id: qid, data: finalValues }));
              navigate('/my-quizzes');
            }}
            validationSchema={quizValidation}
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <CustomInput
                  errors={errors}
                  touched={touched}
                  label="Quiz Title"
                  name="title"
                  placeholder="Enter Quiz Title"
                />
                {/* Add Qustions Array */}
                <Questions
                  values={values}
                  setFieldValue={setFieldValue}
                  errors={errors}
                />
                <div className="flex items-center justify-end mt-4">
                  <Button className="" htmlType="submit" type="primary">
                    Save
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Spin>
    </div>
  );
}
