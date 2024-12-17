import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import HomeComponent from './Components/HomeComponent/HomeComponent'
import QuizInstructionComponent from './Components/QuizInstructionComponent/QuizINstructionComponent'
import PlayComponent from './Components/PlayComponent/PlayComponent'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' Component={HomeComponent}/>
        <Route path='/play/instructions' Component={QuizInstructionComponent}/>
        <Route path='/play/quiz' Component={PlayComponent}/>
      </Routes>
    </Router>
  )
}

export default App
