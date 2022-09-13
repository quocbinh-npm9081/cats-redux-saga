import './App.css'
import React from 'react'
import { Link } from 'react-router-dom'
const App = () => {
  return (
    <div className='App'>
     <Link to='/cats/page-1'>Show cats</Link>

    </div>
  )
}

export default App