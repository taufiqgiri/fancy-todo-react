import '../App.css'
import React, {Component} from 'react'
import NavbarLogin from '../components/NavbarLogin'
import {
  Link
} from 'react-router-dom'
import RegisterButton from '../components/RegisterButton'
import ErrorPage from '../pages/ErrorPage'

function RegisterPage() {
  const authenticated = localStorage.getItem('access_token')
  return (
    <div>
      { !authenticated ? <ShowRegisterPage></ShowRegisterPage> : <ErrorPage></ErrorPage> }
    </div>
  )
}

class ShowRegisterPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  changeState = () => {
    this.setState({
      name: '',
      email: '',
      password: ''
    }, (err, res) => {
      if (err) {
        console.log(err)
      }
    })
  }

  render () {
    return (
      <div>
        <NavbarLogin></NavbarLogin>
        <div className="all-register-page">
          <div className="register-page">
            <form className="register-form">
              <div className="form-group">
                <label htmlFor="name" className="text-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={(e) => {this.setState({ name: e.target.value })}} placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-label">Email address</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={this.state.email} onChange={(e) => {this.setState({ email: e.target.value })}} placeholder="Enter your email" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={(e) => {this.setState({ password: e.target.value })}} placeholder="Enter your password" />
              </div>
              <RegisterButton data={{ name: this.state.name, email: this.state.email, password: this.state.password }} changeState={this.changeState} ></RegisterButton>
              <Link to='/'><button type="submit" className="btn btn-danger ml-1">Cancel</button></Link>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPage