import { Field, getIn } from 'formik';
import { Input } from 'formik-antd';

function ErrorMessage({ name }) {
  return (
    <Field name={name}>
      {({ form }) => {
        const error = getIn(form.errors, name);
        const touch = getIn(form.touched, name);
        return touch && error ? error : null;
      }}
    </Field>
  );
}

export function CustomTextArea({ name, label, placeholder, hideError }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <p className="mb-0">{label}</p>
        {!hideError ? (
          <div className="text-red-500">
            <ErrorMessage name={name} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <Input.TextArea name={name} placeholder={placeholder} rows={4} />
    </div>
  );
}
