// quizSubmission.js (in routes folder)
const express = require('express');
const router = express.Router();
const Quiz = require('../models/quizModel'); 

// Route to handle quiz submission
router.post('/quiz/:id/submit', async (req, res) => {
  try {
    const quizId = req.params.id;
    const submittedAnswers = req.body.answers; 

    // Retrieve the quiz from the database
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Process the submitted answers
    const result = processAnswers(quiz, submittedAnswers);

    // Return the result
    res.json({ result });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to process submitted answers
function processAnswers(quiz, submittedAnswers) {
  // Initialize score
  let score = 0;

  // Loop through each submitted answer
  submittedAnswers.forEach((submittedAnswer, index) => {
    const correctOptions = quiz.questions[index].options
      .filter((option) => option.isCorrect)
      .map((correctOption) => correctOption.optionText);

    // Check if submitted answer matches any correct option
    if (correctOptions.includes(submittedAnswer.selectedOption)) {
      score++;
    }
  });

  // Calculate percentage score
  const totalQuestions = quiz.questions.length;
  const percentageScore = (score / totalQuestions) * 100;

  return { score, totalQuestions, percentageScore };
}

module.exports = router;
