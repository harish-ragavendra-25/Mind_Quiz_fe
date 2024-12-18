import React, { useState, useEffect, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import './PlayComponent.css';
import questions from '../../questions.json';

import correctNotification from '../../assets/audio/correct-answer.mp3'
import wrongNotification from '../../assets/audio/wrong-answer.mp3'
import buttonSound from '../../assets/audio/button-sound.mp3'
import { Navigate, useNavigate } from 'react-router-dom';

const PlayComponent = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    hints: 2,
    currentQuestion: {},
    previousRandomNumbers: [],
    nextButtonDisabled:false,
    previousButtonDisabled:true,
    time: { minutes: 2, seconds: 15 },
  });

  // useEffect(() => {
  //   // Initialize the first question
  //   const currentQuestion = questions[state.currentQuestionIndex];
  //   setState((prevState) => ({
  //     ...prevState,
  //     currentQuestion,
  //   }));

  //   // Start timer
  //   const timerInterval = setInterval(() => {
  //     setState((prevState) => {
  //       const { minutes, seconds } = prevState.time;
  //       if (seconds === 0 && minutes === 0) {
  //         clearInterval(timerInterval);
  //         alert('Time is up! Quiz Completed!'); // Notify user
  //         navigate('/play/quizSummary'); // Optional: Navigate to a "Quiz Completed" page
  //       return prevState;
  //         return prevState;
  //       }
  //       const newSeconds = seconds === 0 ? 59 : seconds - 1;
  //       const newMinutes = seconds === 0 ? minutes - 1 : minutes;

  //       return {
  //         ...prevState,
  //         time: { minutes: newMinutes, seconds: newSeconds },
  //       };
  //     });
  //   }, 1000);

  //   return () => clearInterval(timerInterval);
  // }, [state.currentQuestionIndex]);

  useEffect(() => {
    // Initialize the first question
    const currentQuestion = questions[state.currentQuestionIndex];
    setState((prevState) => ({
      ...prevState,
      currentQuestion,
    }));
  
    // Handle button disable logic
    const handleDisableButton = () => {
      const isFirstQuestion = state.currentQuestionIndex === 0;
      const isLastQuestion = state.currentQuestionIndex + 1 === questions.length;
  
      setState((prevState) => ({
        ...prevState,
        previousButtonDisabled: isFirstQuestion,
        nextButtonDisabled: isLastQuestion,
      }));
    };
  
    handleDisableButton();
  
    // Start timer
    const timerInterval = setInterval(() => {
      setState((prevState) => {
        const { minutes, seconds } = prevState.time;
        if (seconds === 0 && minutes === 0) {
          clearInterval(timerInterval);
          endGame();
          return prevState;
        }
        const newSeconds = seconds === 0 ? 59 : seconds - 1;
        const newMinutes = seconds === 0 ? minutes - 1 : minutes;
    
        return {
          ...prevState,
          time: { minutes: newMinutes, seconds: newSeconds },
        };
      });
    }, 1000);
    
  
    return () => clearInterval(timerInterval);
  }, [state.currentQuestionIndex]);
  
  const handleOptionClick = (option) => {
    if (option === state.currentQuestion.answer) {
      setState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
      }));
      document.getElementById('correct-sound').play();
      alert('Correct!');
    } else {
      document.getElementById('wrong-sound').play();
      alert('Wrong Answer!');
    }
  
    // Reset visibility of all options
    const options = document.querySelectorAll('.option');
    options.forEach((option) => {
      option.style.visibility = 'visible';
    });
  
    // Move to next question or end quiz
    if (state.currentQuestionIndex + 1 < questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
    } else {
      alert('Quiz Completed!');
      navigate('/play/quizSummary'); // Optional: Navigate to summary page
    }

    if (state.currentQuestionIndex + 1 === questions.length) {
      endGame();
    }
  };
  
  const handlePreviousButtonClick = () => {
    playButtonSound();
    if (state.currentQuestionIndex > 0) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex - 1,
      }));
    }
  };

  const handleQuitButtonClick = () => {
    playButtonSound();
    const playerStats = {
      score: state.score,
      numberOfQuestions: questions.length,
      numberOfAnsweredQuestions: state.currentQuestionIndex + 1,
      correctAnswers: state.score, // Assuming the score tracks correct answers
      wrongAnswers: state.currentQuestionIndex + 1 - state.score,
      hintsUsed: 2 - state.hints
    };
    if (window.confirm('Are you sure you want to quit?')) {
      alert('You have quit the quiz.');
      navigate('/play/quizSummary', { state: playerStats });
      console.log(playerStats)
    }
  };

  const playButtonSound = () => {
    document.getElementById('button-sound').play();
  }
  const currentQuestion = questions[state.currentQuestionIndex];

  const handleHints = () => {
    if (state.hints > 0) {
      const options = Array.from(document.querySelectorAll('.option'));
      let indexOfAnswer;
  
      // Find the index of the correct answer
      options.forEach((option, index) => {
        if (option.innerHTML.toLowerCase() === state.currentQuestion.answer.toLowerCase()) {
          indexOfAnswer = index;
        }
      });
  
      // Track how many wrong options are hidden
      let hiddenCount = 0;
      let hiddenOptions = [];
  
      // Loop to hide two wrong options
      while (hiddenCount < 2) {  // Hide 2 wrong options
        const randomNumber = Math.floor(Math.random() * 4);  // Random number between 0 and 3
        
        // Ensure we do not hide the correct answer
        if (randomNumber !== indexOfAnswer && !hiddenOptions.includes(randomNumber)) {
          options[randomNumber].style.visibility = 'hidden';  // Hide wrong options
          hiddenOptions.push(randomNumber);
          hiddenCount++;
        }
      }
  
      // Update state for remaining hints and previously hidden options
      setState((prevState) => ({
        ...prevState,
        hints: prevState.hints - 1,
        previousRandomNumbers: [...prevState.previousRandomNumbers, ...hiddenOptions],
      }));
    }
  };  
  
  // Logic for the Next button - after hints are exhausted
  const handleNextButtonClick = () => {
    playButtonSound();
  
    // Reset visibility before moving to the next question
    const options = Array.from(document.querySelectorAll('.option'));
    options.forEach(option => {
      option.style.visibility = 'visible'; // Reset to visible
    });
  
    // Update state and move to the next question
    if (state.currentQuestionIndex + 1 < questions.length) {
      setState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        previousRandomNumbers: [], // Clear hidden options for the next question
      }));
    } else {
      alert('No more questions!');
    }
  };

  const endGame = () => {
    alert('Quiz has ended!');
    const playerStats = {
      score: state.score,
      numberOfQuestions: questions.length,
      numberOfAnsweredQuestions: state.currentQuestionIndex + 1,
      correctAnswers: state.score, // Assuming the score tracks correct answers
      wrongAnswers: state.currentQuestionIndex + 1 - state.score,
      hintsUsed: 2 - state.hints
    };
    setTimeout(() => {
      navigate('/play/quizSummary', { state: playerStats });
      console.log(playerStats);
    }, 1000);
  };  
  
  return (
    <Fragment>
      <Helmet>
        <title>Mind Quiz Page</title>
      </Helmet>

      <Fragment>
        <audio id='correct-sound' src = {correctNotification}></audio>
        <audio id='wrong-sound' src = {wrongNotification}></audio>
        <audio id='button-sound' src = {buttonSound}></audio>
      </Fragment>

      <div className="questions">
        <div className="lifeline-container">

          <p onClick={handleHints} className='lifeline'>
            <img
              id="hints_img"
              src="https://img.icons8.com/?size=100&id=59810&format=png&color=000000"
              alt="hint_image"
            />
            {state.hints}
          </p>
        </div>

        <div className="timer-container">
          <span className="progress">
            {`${state.currentQuestionIndex + 1} of ${questions.length}`}
          </span>
          <span className="timer">
            {`${state.time.minutes}:${state.time.seconds < 10 ? '0' : ''}${state.time.seconds}`}
            <img
              id="timer_img"
              src="https://img.icons8.com/ios/50/timer.png"
              alt="timer"
            />
          </span>
        </div>

        <h5>{currentQuestion.question}</h5>
        <div className="options-container">
          {/* Render options dynamically */}
          {currentQuestion.optionA && (
            <p className="option" onClick={() => handleOptionClick(currentQuestion.optionA)}>
              {currentQuestion.optionA}
            </p>
          )}
          {currentQuestion.optionB && (
            <p className="option" onClick={() => handleOptionClick(currentQuestion.optionB)}>
              {currentQuestion.optionB}
            </p>
          )}
          {currentQuestion.optionC && (
            <p className="option" onClick={() => handleOptionClick(currentQuestion.optionC)}>
              {currentQuestion.optionC}
            </p>
          )}
          {currentQuestion.optionD && (
            <p className="option" onClick={() => handleOptionClick(currentQuestion.optionD)}>
              {currentQuestion.optionD}
            </p>
          )}
        </div>

    <div className="button-container">
      <button
        onClick={handlePreviousButtonClick}
        disabled={state.previousButtonDisabled}
      >
        Previous
      </button>
      
      <button
        onClick={handleNextButtonClick}
        disabled={state.nextButtonDisabled}
      >
        Next
      </button>

      <button onClick={handleQuitButtonClick}>Quit</button>
    </div>

      </div>
    </Fragment>
  );
};

export default PlayComponent;