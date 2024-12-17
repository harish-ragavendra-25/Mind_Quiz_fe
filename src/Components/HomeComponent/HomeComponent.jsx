import React from 'react'
import { Helmet } from 'react-helmet'
import './Home.css'
import { Link } from 'react-router-dom'

const HomeComponent = () => {
  return (
    <>
        <Helmet><title>Home | Mind Quiz</title></Helmet>
        <div id="home">
            <section>
                <div>
                    <img src='src\assets\img\mind_quiz.webp' id='logo_img'></img>
                </div>
                <h1>Mind Quiz</h1>
                <div className="play-button-container">
                  <ul>
                    <li><Link to="/play/instructions" className='play-button'>Play</Link></li>
                  </ul>
                </div>
                <div className="auth-container">
                  <Link to="/login" className='auth-buttons' id='login-button'>Login</Link>
                  <Link to="/register" className='auth-buttons' id='signup-button'>Register</Link>
                </div>
            </section>
        </div>
    </>
  )
}

export default HomeComponent