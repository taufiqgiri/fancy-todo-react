import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { useAlert } from 'react-alert'

function EditButton(props) {
  let history = useHistory()
  const alert = useAlert()

  function handleClick (e) {
    e.preventDefault()
    axios.put('http://localhost:3000/todos/' + props.data.id,
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
        alert.show('Todo edited successfully!!')
        history.push('/home')
      })
      .catch(error => {
        alert.show(error.response.data.message)
        props.getDetail(props.data.id)
      })
  }

  return (
    <button type="submit" className="btn btn-primary" onClick={handleClick}>
      Edit
    </button>
  )
}

export default EditButton