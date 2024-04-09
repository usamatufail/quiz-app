const asyncHandler = require('express-async-handler');
const newId = require('idrand');
const Quiz = require('../models/quizModel');

// @desc    Get Users Quizzes
// @route   GET /api/quizzes
// @access  Private
const getUserQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ user: req.user.id }).populate('user');
  res.status(200).json(quizzes);
});

// @desc    Get All Published Quizzes
// @route   GET /api/quizzes/all
// @access  Public
const getAllQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find({ isPublished: true }).populate('user');
  res.status(200).json(quizzes);
});

// @desc    Get Quiz By ID
// @route   GET /api/quizzes/:id
// @access  Private
const getQuizByID = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(400);
    throw new Error('Quiz not found');
  }
  res.status(200).json(quiz);
});

// @desc    Get Quiz By Permalink
// @route   GET /api/quizzes/permalink/:per
// @access  Public
const getQuizByPermalink = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findOne({ permalink: req.params.per });
  if (!quiz) {
    res.status(400);
    throw new Error('Quiz not found');
  }

  if (!quiz?.isPublished) {
    res.status(400);
    throw new Error('Quiz is not published yet!');
  }

  res.status(200).json(quiz);
});

// @desc    Create Quiz
// @route   POST /api/quizzes
// @access  Private
const setQuiz = asyncHandler(async (req, res) => {
  const permalink = newId(6);
  const quiz = await Quiz.create({
    title: req.body.title,
    questions: req.body.questions,
    isPublished: false,
    permalink,
    user: req.user._id,
  });
  res.status(200).json(quiz);
});

// @desc    Publish Quiz
// @route   PUT /api/quizzes/publish/:id
// @access  Private
const publishQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(400);
    throw new Error('Quiz not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the goal user
  if (quiz?.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // If quiz is already published throw err
  if (quiz?.isPublished) {
    res.status(400);
    throw new Error('Quiz already published');
  }

  const { title, questions, user, permalink } = quiz;

  const finalQuiz = {
    title,
    questions,
    user,
    isPublished: true,
    permalink,
  };

  await Quiz.findByIdAndUpdate(req.params.id, finalQuiz, {
    new: true,
    runValidators: true,
  });

  const updatedQuizFetched = await Quiz.findById(req.params.id).populate(
    'user'
  );

  res.status(200).json(updatedQuizFetched);
});

// @desc    Update Quiz
// @route   PUT /api/quizzes/:id
// @access  Private
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(400);
    throw new Error('Quiz not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the goal user
  if (quiz?.user?.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Check if published then prevent edit
  if (quiz?.isPublished) {
    throw new Error('Quiz is published and cannot be edited anymore.');
  }

  await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const updatedQuizFetched = await Quiz.findById(req.params.id).populate(
    'user'
  );

  res.status(200).json(updatedQuizFetched);
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(400);
    throw new Error('Quiz not found');
  }
  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the goal user
  if (quiz.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }
  await quiz.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getUserQuizzes,
  setQuiz,
  publishQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizByID,
  getQuizByPermalink,
};
