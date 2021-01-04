import React, { Component } from 'react'
import '../App.css'
import NavbarLogin from '../components/NavbarLogin'
import {
  Link
} from 'react-router-dom'
import LoginButton from '../components/LoginButton'
import ErrorPage from '../pages/ErrorPage'

function LoginPage() {
  const authenticated = localStorage.getItem('access_token')
  return (
    <div>
      { !authenticated ? <ShowLoginPage></ShowLoginPage> : <ErrorPage></ErrorPage> }
    </div>
  )
}

class ShowLoginPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      email: '',
      password: ''
    }
  }

  changeState = () => {
    this.setState({
      email: '',
      password: ''
    }, (err, res) => {
      if (err) {
        console.log(err)
      }
    })
  }

  render() {
    return (
      <div>
        <NavbarLogin />
        <div className="all-login-page">
          <div className="login-page">
            <form className="login">
                <div className="form-group">
                  <label htmlFor="username" className="text-label">Email address</label>
                  <input type="email" className="form-control" id="username" name="username" placeholder="Enter your email" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-label">Password</label>
                  <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
                </div>
                <LoginButton data={{ email: this.state.email, password: this.state.password }} changeState={this.changeState} ></LoginButton>
            </form>
            <br />
            <div id="register">
                <p id="register-guidetext">Haven't an account?</p>
                <Link to='/register'><button type="button" className="btn btn-success" id="btn-register">Register</button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage