import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'

function RegisterButton(props) {
  let history = useHistory()
  const alert = useAlert()

  function handleClick (e) {
    e.preventDefault()
    axios.post('http://localhost:3000/register', 
    {
      name: props.data.name,
      username: props.data.email,
      password: props.data.password
    })
      .then(response => {
        alert.show('User Register is successful!!')
        history.push('/')
      })
      .catch(error => {
        alert.show(error.response.data.message)
        props.changeState()
      })
  }

  return (
    <button type="submit" className="btn btn-primary mr-1" onClick={handleClick}>
      Register
    </button>
  )
}

export default RegisterButton