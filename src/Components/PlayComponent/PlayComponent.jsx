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
    lifelines: 2,
    currentQuestion: {},
    previousRandomNumbers: [],
    time: { minutes: 2, seconds: 15 },
  });

  useEffect(() => {
    // Initialize the first question
    const currentQuestion = questions[state.currentQuestionIndex];
    setState((prevState) => ({
      ...prevState,
      currentQuestion,
    }));

    // Start timer
    const timerInterval = setInterval(() => {
      setState((prevState) => {
        const { minutes, seconds } = prevState.time;
        if (seconds === 0 && minutes === 0) {
          clearInterval(timerInterval);
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

    // Move to next question or end quiz
    if (state.currentQuestionIndex + 1 < questions.length) {
      setState((prevState) => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
      }));
      handleNextButtonClick();
    } else {
      alert('Quiz Completed!');
    }
  };

//   const handleNextButtonClick = () => {
//     playButtonSound();
  
//     // Reset option visibility before moving to the next question
//     const options = Array.from(document.querySelectorAll('.option'));
//     options.forEach(option => {
//       option.style.display = 'block'; // Reset to default display type
//     });
  
//     if (state.currentQuestionIndex + 1 < questions.length) {
//       setState((prevState) => ({
//         ...prevState,
//         currentQuestionIndex: prevState.currentQuestionIndex + 1,
//         previousRandomNumbers: [], // Clear previously hidden options for the next question
//       }));
//     } else {
//       alert('No more questions!');
//     }
//   };
  

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
    if (window.confirm('Are you sure you want to quit?')) {
      alert('You have quit the quiz.');
      navigate('/')
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
          
          <p className='lifeline'>
            <img
              id="lifeline_img"
              src="https://img.icons8.com/external-victoruler-solid-victoruler/64/external-chance-business-and-finance-victoruler-solid-victoruler.png"
              alt="lifeline"
            />
            {state.lifelines}
          </p>

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
          <button onClick={handlePreviousButtonClick}>Previous</button>
          <button onClick={handleNextButtonClick}>Next</button>
          <button onClick={handleQuitButtonClick}>Quit</button>
        </div>
      </div>
    </Fragment>
  );
};

export default PlayComponent;