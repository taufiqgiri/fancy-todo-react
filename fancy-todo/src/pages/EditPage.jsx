import React, {useState, useEffect} from 'react'
import '../App.css'
import {
  Link,
  useParams
} from 'react-router-dom'
import LoginPage from './LoginPage'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDue_date] = useState('')
  let { id } = useParams()
  const authenticated = localStorage.getItem('access_token')
  const history = useHistory()

  function submitEdit() {
    fetch('http://localhost:3000/todos/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token')
      },
      body: JSON.stringify({
        title,
        description,
        due_date
      })
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
        console.log('data berhasil diubah')
        history.push('/home')
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetch('http://localhost:3000/todos/' + id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        access_token: localStorage.getItem('access_token')
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
        setTitle(data[0].title)
        setDescription(data[0].description)
        setDue_date(data[0].due_date)
      })
      .catch(error => {
        console.log(error)
      })
  }, [id])

  if (!authenticated) {
    return <LoginPage></LoginPage>
  }

  return(
    <div className="edit-page">
      <h1 className="text-center">Edit Todo</h1>
      <form className="edit-form">
        <div className="form-group">
          <label htmlFor="title" className="text-label">Title</label>
          <input type="text" className="form-control" id="title" name="title"
          onChange={(e) => {setTitle(e.target.value)}}
          value={title} placeholder="Enter your todo" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="text-label">Description</label>
          <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name="description" onChange={(e) => {setDescription(e.target.value)}} value={description} placeholder="Enter todo's description (optional)" />
        </div>
        <div className="form-group">
          <label htmlFor="due_date" className="text-label">Due Date</label>
          <input type="date" className="form-control" id="due_date" name="due_date" onChange={(e) => {setDue_date(e.target.value)}} value={due_date} />
        </div>
        <button className="btn btn-primary" onClick={submitEdit}>Edit</button>
        <Link to='/home'><button className="btn btn-danger">Cancel</button></Link>
      </form>
    </div>
  )
}

export default EditPage