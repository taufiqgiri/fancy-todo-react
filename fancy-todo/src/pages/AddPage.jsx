import '../App.css'
import React, {useState} from 'react'
import {
  Link,
  useHistory
} from 'react-router-dom'
import LoginPage from './LoginPage'

function AddPage() {
  const authenticated = localStorage.getItem('access_token')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDue_date] = useState('')
  const history = useHistory()

  function submitAdd (e) {
    e.preventDefault()
    fetch('http://localhost:3000/todos', {
      method: 'POST',
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
        const data = await response.json()
        if (!response.ok) {
          const error = (data && data.message) || response.status
          return Promise.reject(error)
        }
        return data
      })
      .then(data => {
        console.log('data berhasil ditambahkan')
        history.push('/home')
      })
      .catch(error => {
        console.log(error)
        setTitle('')
        setDescription('')
        setDue_date('')
      })
  }

  if (!authenticated) {
    return <LoginPage></LoginPage>
  }

  return(
    <div className="add-page">
      <h1 className="text-center">Add Todo</h1>
      <form id="add-form">
        <div className="form-group">
          <label htmlFor="title" className="text-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={(e) => {setTitle(e.target.value)}} value={title} placeholder="Enter your todo" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="text-label">Description</label>
          <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name="description" onChange={(e) => {setDescription(e.target.value)}} value={description} placeholder="Enter todo's description (optional)" />
        </div>
        <div className="form-group">
          <label htmlFor="due_date" className="text-label">Due Date</label>
          <input type="date" className="form-control" id="due_date" name="due_date" onChange={(e) => {setDue_date(e.target.value)}} value={due_date} />
        </div>
        <button type="submit" className="btn btn-primary mr-2" onClick={submitAdd}>Add</button>
        <Link to='/home'><button className="btn btn-danger ml-2">Cancel</button></Link>
      </form>
    </div>
  )
}

export default AddPage