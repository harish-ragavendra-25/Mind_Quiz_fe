import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import HomeComponent from './Components/HomeComponent/HomeComponent'
import QuizInstructionComponent from './Components/QuizInstructionComponent/QuizINstructionComponent'
import PlayComponent from './Components/PlayComponent/PlayComponent'
import QuizSummaryComponent from './Components/QuizSummaryComponent/QuizSummaryComponent'
import LoginComponent from './Components/LoginComponent/LoginComponent'
import Signup from './Components/SignUpComponent/SignUpComponent'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' Component={LoginComponent}/>
        <Route path='/signUp' Component={Signup}/>
        <Route path='/home' Component={HomeComponent}/>
        <Route path='/play/instructions' Component={QuizInstructionComponent}/>
        <Route path='/play/quiz' Component={PlayComponent}/>
        <Route path='/play/quizSummary' Component={QuizSummaryComponent}/>
      </Routes>
    </Router>
  )
}

export default App
