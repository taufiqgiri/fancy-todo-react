import './App.css';
import React, {Component, Fragment} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MainPage from './pages/MainPage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'

class App extends Component {
  render () {
    return (
      <Router>
        <Fragment>
          <div className="App">
              <Route path="/" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/home" exact component={MainPage} />
              <Route path="/add" exact component={AddPage} />
              <Route path="/edit/:id" exact component={EditPage} />
          </div>
        </Fragment>
      </Router>
    )
  }
}

export default App;
