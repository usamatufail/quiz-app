import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizByPermalink } from 'store/quiz/quiz.actions';
import { Questions } from './sections/Questions.section';
import { Score } from './sections/Score.section';

function Quiz() {
  const { permalink } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getQuizByPermalink(permalink));
  }, []);

  const { loading, quiz } = useSelector((state) => state?.quizzes);

  // Current Question
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Answer (true of false)
  const [answer, setAnswer] = useState(undefined);
  // Score
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Set Questions
  useEffect(() => {
    if (quiz?.questions) {
      setQuestions(quiz?.questions);
    }
  }, [quiz]);

  // Next Question
  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevState) => prevState + 1);
      if (answer === true) {
        setScore((prevState) => prevState + 1);
      }
      setAnswer(undefined);
    } else {
      if (answer === true) {
        setScore((prevState) => prevState + 1);
      }
      setShowScore(true);
    }
  };

  const isMultiple = questions[currentQuestion]?.isMultiple;

  return (
    <Spin spinning={loading}>
      {!questions?.length ? (
        <div className="max-w-[1440px] ml-[auto] mr-[auto] shadow-lg border-[1px] border-[#fafafa] rounded-md mt-5 w-full p-[40px]">
          <h1 className="text-center mt-10">{quiz?.title}</h1>
          <h2>No Questions in this Quiz Yet!</h2>
          <Button type="primary" htmlType="button" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      ) : (
        <div className="max-w-[1440px] ml-[auto] mr-[auto]">
          <h1 className="text-center mt-10">{quiz?.title}</h1>
          {!showScore ? (
            // Question Box
            <Questions
              questions={questions}
              currentQuestion={currentQuestion}
              isMultiple={isMultiple}
              setAnswer={setAnswer}
              nextQuestion={nextQuestion}
              answer={answer}
            />
          ) : (
            // Show Score
            <Score
              score={score}
              questions={questions}
              setCurrentQuestion={setCurrentQuestion}
              setScore={setScore}
              setAnswer={setAnswer}
              setShowScore={setShowScore}
              navigate={navigate}
            />
          )}
        </div>
      )}
    </Spin>
  );
}

export default Quiz;
