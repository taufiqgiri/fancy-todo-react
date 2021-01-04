import '../App.css'
import React from 'react'
import axios from 'axios'
import {
  Link
} from 'react-router-dom'
import Child from '../pages/EditPage'
import { useAlert } from 'react-alert'

function TodoCard (props) {
  const alert = useAlert()

  function deleted (e) {
    e.preventDefault()
    axios.delete('http://localhost:3000/todos/' + props.data.id,
    {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        alert.show('Todo deleted successfully!!')
        props.fetchTodos()
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  return (
    <div className="card col-md-3 m-2">
      <div className="card-body">
        <div className="mb-2">
          <h5 className="card-title">{props.data.title}</h5>
          <p className="card-text">{props.data.description}</p>
          <p className="card-text">{props.data.due_date}</p>
        </div>
        <div className="mt-2">
          <Link to={"/edit/" + props.data.id} children={<Child />}><button className="btn btn-primary mr-1">Edit</button></Link>
          <button className="btn btn-danger ml-1" onClick={deleted}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard