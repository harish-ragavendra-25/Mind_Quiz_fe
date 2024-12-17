import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import './PlayComponent.css'
const PlayComponent = () => {
  return (
    <Fragment>
        <Helmet><title>Mind Quiz Page</title></Helmet>
        <div className="questions">
            <div className="lifeline-container">
                <p>
                    {/* lifeline img */}
                <img id='lifeline_img' src="https://img.icons8.com/external-victoruler-solid-victoruler/64/external-chance-business-and-finance-victoruler-solid-victoruler.png" alt="external-chance-business-and-finance-victoruler-solid-victoruler"/>
                2
                </p>
                <p>
                    {/* hints img */}
                    <img id='hints_img' src="https://img.icons8.com/?size=100&id=59810&format=png&color=000000" alt="hint_image" />
                2
                </p>
            </div>
            
            <div className="timer-container">
                <span className="progress">1 of 15</span>
                <span className="timer">
                    2:15
                    {/* timer image */}
                    <img id="timer_img" src="https://img.icons8.com/ios/50/timer.png" alt="timer" />
                </span>
            </div>


            <h5>Google was found in what year?</h5>
            <div className="options-container">
                <p className='option'>1997</p>
                <p className='option'>1998</p>
            </div>
            <div className="options-container">
                <p className='option'>1999</p>
                <p className='option'>2000</p>
            </div>
            <div className="button-container">
                <button>Previous</button>
                <button>Next</button>
                <button>Quit</button>
            </div>
        </div>
    </Fragment>
  )
}

export default PlayComponent