import { Button } from 'antd';
import { Formik } from 'formik';
import { Form as AntdForm, Input } from 'formik-antd';
import './Form.styles.scss';

export function Form({
  initialValues,
  onSubmit,
  validationSchema,
  submitText,
  fields,
}) {
  return (
    <div className="custom-form">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <AntdForm className="custom-form__wrapper">
            {fields.map((field) => {
              const isError = errors[field?.name] && touched[field?.name];
              return (
                <div key={field?.name}>
                  <p>{field?.title}</p>
                  {field?.customEl ? (
                    field?.customEl
                  ) : (
                    <Input
                      type={field?.type}
                      name={field?.name}
                      placeholder={field?.placeholder}
                    />
                  )}
                  <p
                    className={`custom-form__wrapper-error ${
                      isError ? 'custom-form__wrapper-error-show' : ''
                    }`}
                  >
                    {isError ? errors[field?.name] : <>&nbsp;</>}
                  </p>
                </div>
              );
            })}
            <Button
              className="custom-form__wrapper-btn"
              htmlType="submit"
              type="primary"
            >
              {submitText}
            </Button>
          </AntdForm>
        )}
      </Formik>
    </div>
  );
}
