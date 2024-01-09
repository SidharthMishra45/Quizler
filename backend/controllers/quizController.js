const Quiz = require('../models/quizModel');
const ErrorResponse = require('../utils/errorResponse');

// Create quiz
exports.createQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.create(req.body);

        res.status(201).json({
            success: true,
            quiz
        });
    } catch (error) {
        next(error);
    }
};

exports.singleQuiz = async (req, res, next) => {
    try {


        const {id}= req.params;
        console.log(id);
        const quiz = await Quiz.findById(id);
        
        if (!quiz) {
            return res.status(404).json({
                success: false,
                error: 'Quiz not found',
            });
        }

        res.status(200).json({
            success: true,
            quiz,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error',
        });
    }
};

// Update quiz by ID
exports.updateQuiz = async (req, res, next) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!quiz) {
            return next(new ErrorResponse('Quiz not found', 404));
        }

        res.status(200).json({
            success: true,
            quiz: {
                _id: quiz._id
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.showQuizzes = async (req, res) => {
    try {
      let quizzes;
  
      if (req.query.title) {
        // If a title is provided in the query, filter quizzes by title
        quizzes = await Quiz.find({ title: { $regex: new RegExp(req.query.title, 'i') } });
      } else {
        // Otherwise, return all quizzes
        quizzes = await Quiz.find();
      }
  
      res.json({ quizzes });
    } catch (error) {
      console.error('Error fetching quizzes:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.getQuizIDFromMongoDB = async (req, res) => {
    try {
      // Use findOne or find based on your requirements
      const quiz = await Quiz.findOne(req.params.id);
  
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
  
      const quizID = quiz._id; // Assuming _id is the ID field
  
      res.status(200).json({ quizID });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };