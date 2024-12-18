import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import './QuizInstruction.css'

const QuizInstructionComponent = () => {
    return (
    <Fragment>
        <Helmet>
            <title>Quiz Instructions</title>
        </Helmet>
        <div className="instruction_container">
            <h1>How to play the game</h1>
            <p>Ensure you read this guide from start to finish</p>
            <ul class="browser-default" id='main-list'>
                <li>The game has a duration of 15 minutes and ends as soon as your time elapses.</li>
                <li>Each game consists of 15 questions.</li>
                <li>
                    Every question contains 4 questions.
                    <img src='\src\assets\img\options.PNG' alt="Quiz app options example" />
                </li>
                
                <li>
                    select the option which best answers the question by clicking (or selecting) it.
                    <img src='\src\assets\img\answer.png' alt="Quiz app answer Example" />
                </li>

                <li>
                    Each game has 1 lifelines namely.
                    <ul id='sublist'>
                        <li>3 Hints</li>
                    </ul>
                    <img src='\src\assets\img\answer.png' alt="Quiz app answer Example" />
                </li>

                <li>
                    select the option which best answers the question by clicking (or selecting) it.
                    {/* lifeline image */}
                    
                    <img src="https://img.icons8.com/external-victoruler-solid-victoruler/64/external-chance-business-and-finance-victoruler-solid-victoruler.png" alt="external-chance-business-and-finance-victoruler-solid-victoruler"/>
                    
                    will leave two wrong answers and one correct answer: u can use as many hints as possible on a single question

                    <img src="\src\assets\img\fiftyFifty.PNG" alt="Quiz App Fifty-Fifty example"/>
                </li>

                <li>
                    Using a hint by clicking the icon

                    {/* hint icon */}
                    <img src="https://img.icons8.com/?size=100&id=59810&format=png&color=000000" alt="hint_image" />

                    <img src="\src\assets\img\hints.PNG" alt="Quiz App hints Example" />
                </li>
                <li>Feel free to quit (or retire from) the game at any time. In that case your score will be revealed afterwards.</li>
                <li>The timer starts as soon as the game loads.</li>
                <li>Let's do this if you think you've got what it takes?</li>
            </ul>
            <div>
                <span className="left"><Link to="/">No take me back</Link></span>
                <span className="right"><Link to="/play/quiz">Okay, Let's do this!</Link></span>
            </div>
        </div>
    </Fragment>
  )
}

export default QuizInstructionComponent