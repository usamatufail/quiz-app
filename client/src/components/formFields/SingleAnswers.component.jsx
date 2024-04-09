import { Radio } from 'antd';
import { useEffect, useState } from 'react';

export function SingleAnswer({ options, setAnswer }) {
  const [correct, setCorrect] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (options) {
      let correctId = null;
      options?.forEach((opt) => {
        if (opt?.isCorrect) {
          correctId = opt?._id;
        }
      });
      setCorrect(correctId);
    }
  }, [options]);

  const onChange = (e) => {
    setValue(e?.target?.value);
  };

  useEffect(() => {
    if (value) {
      if (value === correct) {
        setAnswer(true);
      } else {
        setAnswer(false);
      }
    } else {
      setAnswer(undefined);
    }
  }, [value]);

  return (
    <Radio.Group
      onChange={onChange}
      value={value}
      size="large"
      className="w-full flex items-start flex-col gap-[12px] mt-[20px]"
    >
      {options?.map((opt) => (
        <div
          key={opt?._id}
          className={
            value === opt?._id
              ? 'custom-checkbox custom-checkbox-checked'
              : 'custom-checkbox'
          }
          role="button"
          aria-hidden="true"
          onClick={() => {
            setValue(opt?._id);
          }}
        >
          <Radio
            key={opt?._id}
            value={opt?._id}
            size="large"
            checked={value === opt?._id}
          >
            <span className="custom-checkbox-text text-[14px]">
              {opt?.option}
            </span>
          </Radio>
        </div>
      ))}
    </Radio.Group>
  );
}
