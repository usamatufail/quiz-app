import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import { CustomInput, CustomTextArea } from 'components';
import { FieldArray } from 'formik';

export function Questions({ values, setFieldValue, errors }) {
  return (
    <>
      <div className="text-[18px]">Questions:</div>
      <FieldArray
        name="questions"
        render={(arrayHelpers) => (
          <div className="flex flex-col gap-[20px]">
            {values.questions.map((question, index) => (
              <div
                key={index}
                className="w-full relative shadow-xl border-[1px] border-[#fafafa] rounded-md p-[30px] flex flex-col gap-[20px]"
              >
                {/* Qustion */}
                <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-[12px]">
                  <CustomTextArea
                    label={`Question ${index + 1}`}
                    name={`questions[${index}].title`}
                    placeholder="Enter Question"
                  />
                  {/* is Multiple Answers */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-0">Multiple Answers</p>
                      <Switch
                        checked={question?.isMultiple}
                        onChange={(e) => {
                          values?.questions[index]?.options?.forEach(
                            (_, optionIndex) => {
                              setFieldValue(
                                `questions[${index}].options[${optionIndex}].isCorrect`,
                                false
                              );
                            }
                          );

                          setFieldValue(`questions[${index}].isMultiple`, e);
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        icon={<DeleteOutlined />}
                        type="primary"
                        htmlType="button"
                        className="bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 border-0"
                        onClick={() => arrayHelpers.remove(index)}
                      />
                    </div>
                  </div>
                </div>
                {/* Answers */}
                <FieldArray
                  name={`questions[${index}].options`}
                  render={(arrHelpers) => (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                        {values?.questions?.[index]?.options?.map(
                          (options, idx) => (
                            <div
                              key={idx}
                              className="w-full relative shadow-lg border-[1px] border-[#fafafa] rounded-md p-[12px] flex flex-col gap-[20px]"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-[12px]">
                                {/* Option */}
                                <CustomInput
                                  label={`Answer ${idx + 1}`}
                                  name={`questions[${index}].options[${idx}].option`}
                                  placeholder="Enter Answer"
                                />
                                {/* is Correct Answers */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="mb-0">Correct</p>
                                    <Switch
                                      checked={
                                        values?.questions[index].options[idx]
                                          .isCorrect
                                      }
                                      onChange={(e) => {
                                        if (
                                          values?.questions?.[index].isMultiple
                                        ) {
                                          // If multiple then check any number of options
                                          setFieldValue(
                                            `questions[${index}].options[${idx}].isCorrect`,
                                            e
                                          );
                                        } else {
                                          // If not multiple then only check one option
                                          values?.questions[
                                            index
                                          ]?.options?.forEach((_, optIndex) => {
                                            if (optIndex === idx) {
                                              setFieldValue(
                                                `questions[${index}].options[${optIndex}].isCorrect`,
                                                e
                                              );
                                            } else {
                                              setFieldValue(
                                                `questions[${index}].options[${optIndex}].isCorrect`,
                                                false
                                              );
                                            }
                                          });
                                        }
                                      }}
                                    />
                                  </div>
                                  <Button
                                    icon={<DeleteOutlined />}
                                    type="primary"
                                    htmlType="button"
                                    className="bg-red-500 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 border-0 absolute right-[12px] md:top-[35%]"
                                    onClick={() => arrHelpers.remove(idx)}
                                  />
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex items-center gap-[40px] mt-[20px]">
                        <Button
                          icon={<PlusOutlined />}
                          htmlType="button"
                          type="primary"
                          disabled={
                            values?.questions?.[index]?.options?.length === 5
                          }
                          onClick={() =>
                            arrHelpers.push({
                              option: '',
                              isCorrect: false,
                            })
                          }
                        >
                          Add Options For This Question
                        </Button>
                        <div className="text-red-500">
                          {typeof errors?.questions?.[index]?.options ===
                          'string'
                            ? errors?.questions?.[index]?.options
                            : null}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
            ))}
            <div className="flex items-center">
              <Button
                icon={<PlusOutlined />}
                htmlType="button"
                type="primary"
                disabled={values?.questions?.length === 10}
                onClick={() =>
                  arrayHelpers.push({
                    title: '',
                    isMultiple: false,
                    options: [],
                  })
                }
              >
                Add Question for Quiz
              </Button>
            </div>
            <div className="text-red-500">
              {typeof errors.questions === 'string' ? errors.questions : null}
            </div>
          </div>
        )}
      />
    </>
  );
}
