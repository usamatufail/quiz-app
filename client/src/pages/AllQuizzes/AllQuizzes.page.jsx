import { ShareAltOutlined } from '@ant-design/icons';
import { Button, Switch, Table } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RWebShare } from 'react-web-share';
import { getAllQuizes } from 'store/quiz/quiz.actions';
// import { getAllQuizes } from 'store/Slices/quizSlice';

export default function AllQuizzes() {
  const { loading, quizzes } = useSelector((state) => state?.quizzes);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllQuizes());
  }, []);

  // Table Columns

  const columns = [
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex items-center gap-[12px]">
          <Link to={`/quiz/${record?.permalink}`}>Take Quiz</Link>
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
        return <></>;
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
      <h1 className="text-center mt-[32px]">All Quizzes</h1>
      <Table
        columns={columns}
        dataSource={quizzes}
        loading={loading}
        rowKey={(record) => record?._id}
        scroll={{ x: 1300 }}
      />
    </div>
  );
}
