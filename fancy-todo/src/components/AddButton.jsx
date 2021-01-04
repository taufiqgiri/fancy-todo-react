import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'

function AddButton(props) {
  let history = useHistory()
  const alert = useAlert()

  function handleClick (e) {
    e.preventDefault()
    axios.post('http://localhost:3000/todos', 
    {
      title: props.data.title,
      description: props.data.description,
      due_date: props.data.due_date
    },
    {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        alert.show('Todo added successfully!!')
        history.push('/home')
      })
      .catch(error => {
        alert.show(error.response.data.message)
        props.changeState()
      })
  }

  return (
    <button type="submit" className="btn btn-primary mr-2" onClick={handleClick}>
      Add
    </button>
  )
}

export default AddButton