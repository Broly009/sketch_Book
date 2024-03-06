import React from 'react'
import Menu from './components/menu'
import "./App.css"
import Toolbar from './components/toolbar'
import Board from './components/board'
import { Provider } from 'react-redux'
import { store } from './store'
import "./App.css"

const App = () => {
  return (
    
      <Provider store={store}>
      <Menu/>
      <Toolbar/>
      <Board/>
      </Provider>
  
  
  )
}

export default App