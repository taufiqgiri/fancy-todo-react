import React, { Component } from 'react'
import '../App.css'
import EditButton from '../components/EditButton'
import {
  Link,
  useParams
} from 'react-router-dom'
import axios from 'axios'
import ErrorPage from '../pages/ErrorPage'

function Child() {
  let { id } = useParams()
  const authenticated = localStorage.getItem('access_token')

  return(
    <div>
      { authenticated ? <EditPage id={id}></EditPage> : <ErrorPage></ErrorPage> }
    </div>
  )
}

class EditPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      title: '',
      description: '',
      due_date: '',
      id: props.id
    }
    this.getDetail = this.getDetail.bind(this)
  }

  getDetail (id) {
    axios.get('http://localhost:3000/todos/' + id,
    {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.setState({
          title: response.data[0].title,
          description: response.data[0].description,
          due_date: response.data[0].due_date
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.getDetail(this.state.id)
  }

  render () {
    return (
      <div className="edit-page">
        <h1 className="text-center">Edit Todo</h1>
        <form className="edit-form">
          <div className="form-group">
            <label htmlFor="title" className="text-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" onChange={(e) => {this.setState({title: e.target.value})}} value={this.state.title} placeholder="Enter your todo" />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="text-label">Description</label>
            <input type="text" className="form-control" id="description" aria-describedby="emailHelp" name="description" onChange={(e) => {this.setState({description: e.target.value})}} value={this.state.description} placeholder="Enter todo's description (optional)" />
          </div>
          <div className="form-group">
            <label htmlFor="due_date" className="text-label">Due Date</label>
            <input type="date" className="form-control" id="due_date" name="due_date" onChange={(e) => {this.setState({due_date: e.target.value})}} value={this.state.due_date} />
          </div>
          <EditButton data={{id:this.state.id, title: this.state.title, description: this.state.description, due_date: this.state.due_date}} getDetail={this.getDetail} ></EditButton>
          <Link to='/home'><button className="btn btn-danger">Cancel</button></Link>
        </form>
      </div>
    )
  }
}

export default Child