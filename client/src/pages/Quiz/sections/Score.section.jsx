import { Button } from 'antd';
import Lottie from 'lottie-react';

import pass from 'animations/pass.json';
import fail from 'animations/fail.json';

export function Score({
  score,
  questions,
  setCurrentQuestion,
  setScore,
  setAnswer,
  setShowScore,
  navigate,
}) {
  const totalPer = (score / questions.length) * 100;
  return (
    <div className="max-w-[768px] ml-[auto] mr-[auto] shadow-lg border-[1px] border-[#fafafa] rounded-md mt-5 w-full p-[40px]">
      <h1 className="text-center text-[24px]">
        You answered {score}/{questions?.length} questions correctly.
      </h1>
      <div className="w-full mt-[20px] mb-[20px]  flex items-center justify-center">
        <Lottie
          animationData={totalPer >= 50 ? pass : fail}
          autoPlay
          loop={false}
          style={{ width: 300 }}
        />
      </div>
      {/* Next Button */}
      <div className="flex items-center justify-center gap-[12px]">
        <Button
          htmlType="button"
          type="primary"
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setAnswer(undefined);
            setShowScore(false);
            navigate(-1);
          }}
        >
          Go Back
        </Button>
        <Button
          htmlType="button"
          type="primary"
          className=""
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setAnswer(undefined);
            setShowScore(false);
          }}
        >
          {totalPer >= 50 ? 'Restart Quiz' : 'Try Again'}
        </Button>
      </div>
    </div>
  );
}
