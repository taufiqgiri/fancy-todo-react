import '../App.css'
import React, { useState } from 'react'
import NavbarLogin from '../components/NavbarLogin'
import {
  Link,
  useHistory,
  Redirect
} from 'react-router-dom'

function RegisterPage() {
  const authenticated = localStorage.getItem('access_token')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  function submitRegister (e) {
    e.preventDefault()
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        username: email,
        password
      })
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
        console.log('register sukses!!')
        history.push('/')
      })
      .catch(error => {
        console.log(error)
        setName('')
        setEmail('')
        setPassword('')
      })
  }

  if (authenticated) {
    return <Redirect to='/home' />
  }

  return (
    <div>
      <NavbarLogin></NavbarLogin>
      <div className="all-register-page">
      <img src={"/register-image.png"} alt="fancy-todo" className="img-login mt-5 mr-3" />
        <div className="register-page">
          <form className="register-form">
            <div className="form-group">
              <label htmlFor="name" className="text-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={name} onChange={(e) => {setName(e.target.value)}} placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="text-label">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="text-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-primary mr-1" onClick={submitRegister}>Register</button>
            <Link to='/'><button type="submit" className="btn btn-danger ml-1">Cancel</button></Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage