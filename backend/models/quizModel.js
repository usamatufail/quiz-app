const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  option: {
    type: String,
    trim: true,
    required: [true, 'Answer Text is Required!'],
  },
  isCorrect: { type: Boolean, required: [true, 'isCorrect is Required!'] },
});

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Question Text is Required!'],
  },
  isMultiple: {
    type: Boolean,
    required: [true, 'isMultiple is Required for a Question!'],
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (v) {
        if (v?.length < 1 || v?.length > 5) {
          return false;
        } else {
          let notAllSelected = true;
          v?.forEach((option) => {
            if (option?.isCorrect) notAllSelected = false;
          });
          return !notAllSelected;
        }
      },
      message: () =>
        `Please add 1 to 5 answers to a question and make sure to mark at least one as correct.`,
    },
  },
});

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Quiz Title is Required!'],
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (v) {
          if (v?.length < 1 || v?.length > 10) {
            return false;
          }
        },
        message: () => `Please add 1 to 10 questions in quiz.`,
      },
    },
    isPublished: {
      type: Boolean,
      required: [true, 'isPublished is required!'],
    },
    permalink: {
      type: String,
      sparse: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is Required!'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', quizSchema);
