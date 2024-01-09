const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Quiz title is required'],
    },
    questions: [
        {
            questionText: {
                type: String,
                required: [true, 'Question text is required'],
            },
            options: [
                {
                    optionText: {
                        type: String,
                        required: [true, 'Option text is required'],
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false,
                    },
                },
                {
                    optionText: {
                        type: String,
                        required: [true, 'Option text is required'],
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false,
                    },
                },
                {
                    optionText: {
                        type: String,
                        required: [true, 'Option text is required'],
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false,
                    },
                },
                {
                    optionText: {
                        type: String,
                        required: [true, 'Option text is required'],
                    },
                    isCorrect: {
                        type: Boolean,
                        default: false,
                    },
                },
            ],
        },
    ],
    
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
