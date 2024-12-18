import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import './QuizSummaryComponent.css'
const QuizSummaryComponent = () => {
    const location = useLocation();
    const { state } = location || {};
    const [summary, setSummary] = useState({
        score: 0,
        numberOfQuestions: 0,
        numberOfAnsweredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        hintsUsed: 0,
        fiftyFiftyUsed: 0,
    });

    useEffect(() => {
        if (state) {
            const { score, numberOfQuestions } = state;
            setSummary({
                ...state,
                score: ((score / numberOfQuestions) * 100).toFixed(0),
            });
        }
    }, [state]);

    const getRemark = (score) => {
        if (score <= 30) return 'You need more practice!';
        if (score <= 50) return 'Better luck next time!';
        if (score <= 70) return 'You can do better!';
        if (score <= 84) return 'You did great!';
        return "You're an absolute genius!";
    };

    if (!state) {
        return (
            <div className="quiz-summary">
                <Helmet><title>Quiz App - Summary</title></Helmet>
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li><Link to="/play/quiz">Take a Quiz</Link></li>
                        <li><Link to="/">Back to Home</Link></li>
                    </ul>
                </section>
            </div>
        );
    }

    return (
        <div className="quiz-summary">
            <Helmet><title>Quiz App - Summary</title></Helmet>
            <div className="container">
                <h1>Quiz has ended</h1>
                <div className="stats">
                    <h4>{getRemark(summary.score)}</h4>
                    <h2>Your Score: {summary.score}&#37;</h2>
                    <p>Total questions: {summary.numberOfQuestions}</p>
                    <p>Attempted questions: {summary.numberOfAnsweredQuestions}</p>
                    <p>Correct answers: {summary.correctAnswers}</p>
                    <p>Wrong answers: {summary.wrongAnswers}</p>
                    <p>Hints used: {summary.hintsUsed}</p>
                </div>
                <div className="actions">
                    <Link to="/play/quiz">Play Again</Link>
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
  )
}

export default QuizSummaryComponent