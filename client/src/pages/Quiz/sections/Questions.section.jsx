import { Button } from 'antd';
import { MultipleAnswer, SingleAnswer } from 'components';

export function Questions({
  questions,
  currentQuestion,
  isMultiple,
  setAnswer,
  nextQuestion,
  answer,
}) {
  return (
    <div className="max-w-[768px] ml-[auto] mr-[auto] shadow-lg border-[1px] border-[#fafafa] rounded-md mt-5 w-full p-[40px]">
      {/* Question Title */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="whitespace-pre-line">
            {questions[currentQuestion]?.title}
          </h2>
          {isMultiple ? <p>(Select all that apply)</p> : <></>}
        </div>
        <h4 className="mb-0">
          {currentQuestion + 1}/{questions?.length}
        </h4>
      </div>
      {/* Question Options */}
      {isMultiple ? (
        <MultipleAnswer
          options={questions[currentQuestion]?.options}
          setAnswer={setAnswer}
        />
      ) : (
        <SingleAnswer
          options={questions[currentQuestion]?.options}
          setAnswer={setAnswer}
        />
      )}
      {/* Next Button */}
      <div className="flex items-center justify-end mt-[20px] gap-[12px]">
        <Button
          htmlType="button"
          type="primary"
          onClick={() => {
            setAnswer(undefined);
            nextQuestion();
          }}
          disabled={answer !== undefined}
        >
          Skip
        </Button>
        <Button
          htmlType="button"
          type="primary"
          onClick={nextQuestion}
          disabled={answer === undefined}
        >
          Next Question
        </Button>
      </div>
    </div>
  );
}
