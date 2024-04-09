import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from 'config';
import { toast } from 'react-toastify';

// router.route('/').get(protect, getUserQuizzes).post(protect, setQuiz);
// router.route('/all').get(getAllQuizzes);
// router.route('/publish/:id').put(protect, publishQuiz);
// router.route('/:id').delete(protect, deleteQuiz).put(protect, updateQuiz);

// Get Logged in User's Quizzes
export const getUserQuizzes = createAsyncThunk(
  'quizzes/userQuizzes',
  async () => {
    try {
      const res = await api.get('/quizzes');
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

// Create Quiz
export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (data) => {
    try {
      const res = await api.post('/quizzes', data);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

// Get All Quizzes
export const getAllQuizes = createAsyncThunk('quizes/all', async () => {
  try {
    const res = await api.get('/quizzes/all');
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

// Publish Quiz
export const publishQuiz = createAsyncThunk(
  'quizzes/publishQuiz',
  async (id) => {
    try {
      const res = await api.put(`quizzes/publish/${id}`);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

// Edit Quiz
export const editQuiz = createAsyncThunk(
  'quizzes/edit',
  async ({ id, data }) => {
    try {
      const res = await api.put(`/quizzes/${id}`, data);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

// Delete Quiz
export const deleteQuiz = createAsyncThunk('quizzes/delete', async (id) => {
  try {
    const res = await api.delete(`/quizzes/${id}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

// Get Quiz By ID
export const getQuizByID = createAsyncThunk('quizzes/getByID', async (id) => {
  try {
    const res = await api.get(`/quizzes/${id}`);
    return res?.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

// Get Quiz By Permalink
export const getQuizByPermalink = createAsyncThunk(
  'quizzes/getByPermalink',
  async (permalink) => {
    try {
      const res = await api.get(`/quizzes/permalink/${permalink}`);
      return res?.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
