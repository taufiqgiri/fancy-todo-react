import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'

function LoginButton(props) {
  let history = useHistory()
  const alert = useAlert()

  function handleClick (e) {
    e.preventDefault()
    axios.post('http://localhost:3000/login',
    {
      username: props.data.email,
      password: props.data.password
    })
      .then(response => {
        localStorage.setItem('access_token', response.data.access_token)
        alert.show('User Login in succesful!!')
        history.push('/home')
      })
      .catch(error => {
        alert.show(error.response.data.message)
        props.changeState()
      })
  }

  return (
    <button type="submit" className="btn btn-primary" onClick={handleClick}>
      Login
    </button>
  )
}

export default LoginButton