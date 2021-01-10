import './App.css';
import React, {Fragment} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'
import { Provider } from 'react-redux'
import store from './stores/index'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App">
              <Route path="/" exact component={LoginPage} />
              <Route path="/register" component={RegisterPage} />
              <Route path="/home" component={MainPage} />
              <Route path="/add" component={AddPage} />
              <Route path="/edit/:id" component={EditPage} />
          </div>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
