import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routelist from './router'
import { useSelector, useDispatch } from 'react-redux'
import "./assets/style/reset.less"

function App() {
  const data = useSelector((state) => {
    return state
  })
  const dispatch = useDispatch()

  return (
    <BrowserRouter>
      <Routelist />
    </BrowserRouter>
  )
}

export default App
