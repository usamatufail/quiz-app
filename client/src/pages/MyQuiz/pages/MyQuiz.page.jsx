import { Button, Popconfirm, Switch, Table } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ShareAltOutlined } from '@ant-design/icons';
import { RWebShare } from 'react-web-share';
import {
  deleteQuiz,
  getUserQuizzes,
  publishQuiz,
} from 'store/quiz/quiz.actions';
import moment from 'moment';

export default function MyQuiz() {
  const { loading, myQuizzes } = useSelector((state) => state?.quizzes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserQuizzes());
  }, []);

  // Table Columns
  const columns = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex items-center gap-[12px]">
          {record?.isPublished ? (
            <>
              <Link to={`/quiz/${record?.permalink}`}>Take Quiz</Link>
            </>
          ) : (
            <>
              <Popconfirm
                title={
                  <>
                    Are you sure you want to publish this quiz? <br /> You
                    cannot edit after publishing the quiz.
                  </>
                }
                onConfirm={async () => {
                  dispatch(publishQuiz(record?._id));
                }}
              >
                <span className="text-[#1890ff] cursor-pointer">
                  Publish Quiz
                </span>
              </Popconfirm>
              <Link to={`/my-quizzes/edit/${record?._id}`}>Edit</Link>
            </>
          )}
          <Popconfirm
            title="Are you sure you want to delete this quiz?"
            onConfirm={async () => {
              dispatch(deleteQuiz(record?._id));
            }}
          >
            <span className="text-red-500 cursor-pointer">Delete</span>
          </Popconfirm>
        </div>
      ),
    },
    {
      title: 'Quiz Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Published',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (_) => <Switch checked={_} />,
    },
    {
      title: 'Permalink',
      dataIndex: 'permalink',
      key: 'permalink',
      render: (_, record) => {
        if (record?.isPublished) {
          return (
            <div className="flex items-center gap-[12px]">
              <div>{`/${_}`}</div>
              <RWebShare
                sites={['twitter', 'whatsapp', 'reddit', 'mail', 'copy']}
                data={{
                  text: 'Take this amazing quiz to test your knowledge',
                  url: `${process.env.REACT_APP_CLIENT_URL}/quiz/${_}`,
                  title: 'Share Quiz',
                }}
                closeText="Cancel"
              >
                <Button type="primary" shape="circle">
                  <ShareAltOutlined />
                </Button>
              </RWebShare>
            </div>
          );
        }
        return <>N/A</>;
      },
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_) => moment(_).format('MM/DD/YYYY [at] HH:mm:ss A'),
    },
    {
      title: 'Created By',
      dataIndex: 'user',
      key: 'user',
      render: (_) => <>{_?.name}</>,
    },
  ];

  return (
    <div className="max-w-[1366px] ml-[auto] mr-[auto] px-[25px]">
      <h1 className="text-center mt-[32px]">My Quizzes</h1>
      <div className="flex items-center justify-end mb-4">
        <Link to="/my-quizzes/add">
          <Button type="primary" size="large">
            Add New Quiz
          </Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={myQuizzes}
        loading={loading}
        rowKey={(record) => record?._id}
        scroll={{ x: 1300 }}
      />
    </div>
  );
}
