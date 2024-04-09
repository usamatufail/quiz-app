const express = require('express');
const router = express.Router();
const {
  getUserQuizzes,
  setQuiz,
  updateQuiz,
  deleteQuiz,
  getAllQuizzes,
  publishQuiz,
  getQuizByID,
  getQuizByPermalink,
} = require('../controllers/quizController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUserQuizzes).post(protect, setQuiz);
router.route('/all').get(getAllQuizzes);
router.route('/publish/:id').put(protect, publishQuiz);
router.route('/permalink/:per').get(getQuizByPermalink);
router
  .route('/:id')
  .delete(protect, deleteQuiz)
  .put(protect, updateQuiz)
  .get(protect, getQuizByID);

module.exports = router;
