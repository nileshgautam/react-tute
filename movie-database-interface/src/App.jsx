import { useState } from 'react'
import './App.css'
import BollyWoodMovie from './components/BollyWoodMovie'
import BollyWoodMovieUseMemo from './components/BollyWoodMovieUseMemo';

function App() {

  return (
    <>
      {/* <BollyWoodMovie /> */}
      <BollyWoodMovieUseMemo />
    </>
  )
}

export default App
