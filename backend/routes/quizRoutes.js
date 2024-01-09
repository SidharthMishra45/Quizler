const express = require('express');
const router = express.Router();
const { createQuiz, singleQuiz, updateQuiz, showQuizzes } = require('../controllers/quizController');
const { isAuthenticated } = require('../middleware/auth'); // Remove isAdmin middleware from here

// Quiz routes

// POST /api/quiz/create
router.post('/quiz/create', isAuthenticated, createQuiz);

// GET /api/quiz/:id
router.get('/quiz/:id', isAuthenticated, singleQuiz);

// PUT /api/quiz/update/:id
router.put('/quiz/update/:id', isAuthenticated, updateQuiz); 

// GET /api/quizzes
router.get('/quizzes', isAuthenticated, showQuizzes);

module.exports = router;
