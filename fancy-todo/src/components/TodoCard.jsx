import '../App.css'
import React from 'react'
import {
  Link
} from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import {fetchAllTodos} from '../actions/todosAction'

function TodoCard (props) {
  const alert = useAlert()
  const dispatch = useDispatch()

  function deleted (e) {
    e.preventDefault()
    fetch('http://localhost:3000/todos/' + props.data.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(async response => {
        const data = response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        return data
      })
      .then(data => {
        console.log('data berhasil dihapus')
        dispatch(fetchAllTodos())
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
          <Link to={"/edit/" + props.data.id}><button className="btn btn-primary mr-1">Edit</button></Link>
          <button className="btn btn-danger ml-1" onClick={deleted}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TodoCard