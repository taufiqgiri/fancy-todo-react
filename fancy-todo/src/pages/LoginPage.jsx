import React, { useState } from 'react'
import '../App.css'
import NavbarLogin from '../components/NavbarLogin'
import {
  Link,
  Redirect,
  useHistory
} from 'react-router-dom'

function LoginPage() {
  const authenticated = localStorage.getItem('access_token')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function submitLogin (e) {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: email,
        password: password
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(async response => {
        const data = await response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        return data
      })
      .then(data => {
        localStorage.setItem('access_token', data.access_token)
        history.push('/home')
      })
      .catch(error => {
        console.log(error)
        setEmail('')
        setPassword('')
      })
  }

  if (authenticated) {
    return <Redirect to='/home' />
  }

  return (
    <div>
      <NavbarLogin />
      <div className="all-login-page">
        <img src={"/login-image.png"} alt="fancy-todo" className="img-login mt-5 mr-3" />
        <div className="login-page ml-3">
          <form className="login">
              <div className="form-group">
                <label htmlFor="username" className="text-label">Email address</label>
                <input type="email" className="form-control" id="username" name="username" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="text-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" onClick={submitLogin}>Login</button>
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

export default LoginPage