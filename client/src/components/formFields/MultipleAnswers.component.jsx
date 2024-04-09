import { Checkbox, Space } from 'antd';
import { useEffect, useState } from 'react';
import { areEqualArr } from 'utils';

export function MultipleAnswer({ options, setAnswer }) {
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (options) {
      const correct = [];
      options?.forEach((opt) => {
        if (opt?.isCorrect) {
          correct.push(opt?._id);
        }
      });
      setCorrectAnswers(correct);
    }
  }, [options]);

  const onChange = (checkedValues) => {
    setSelected(checkedValues);
  };

  useEffect(() => {
    if (selected?.length) {
      if (areEqualArr(selected, correctAnswers)) {
        setAnswer(true);
      } else {
        setAnswer(false);
      }
    } else {
      setAnswer(undefined);
    }
  }, [selected]);

  return (
    <Checkbox.Group onChange={onChange} className="w-full" value={selected}>
      <Space direction="vertical" className="w-full">
        {options?.map((opt) => (
          <div
            key={opt?._id}
            className={
              selected?.includes(opt?._id)
                ? 'custom-checkbox custom-checkbox-checked'
                : 'custom-checkbox'
            }
            role="button"
            aria-hidden="true"
            onClick={() => {
              if (selected?.includes(opt?._id)) {
                const newArr = selected?.filter((id) => id !== opt?._id);
                setSelected(newArr);
                onChange(newArr);
              } else {
                const newArr = [...selected, opt?._id];
                setSelected(newArr);
                onChange(newArr);
              }
            }}
          >
            <Checkbox value={opt?._id}>
              <span className="custom-checkbox-text text-[14px]">
                {opt?.option}
              </span>
            </Checkbox>
          </div>
        ))}
      </Space>
    </Checkbox.Group>
  );
}
