import '../App.css'
import React, { Component } from 'react'
import AddButton from '../components/AddButton'
import ErrorPage from '../pages/ErrorPage'
import {
  Link
} from 'react-router-dom'

function AddPage() {
  const authenticated = localStorage.getItem('access_token')

  return(
    <div>
      { authenticated ? <ShowAddPage></ShowAddPage> : <ErrorPage></ErrorPage> }
    </div>
  )
}

class ShowAddPage extends Component {
  constructor (props) {
    super (props)
    this.state = {
      title: '',
      description: '',
      due_date: ''
    }
  }

  changeState = () => {
    this.setState({
      title: '',
      description: '',
      due_date: ''
    }, (err, res) => {
      if (err) {
        console.log(err)
      }
    })
  }

  render () {
    return (
      <div className="add-page">
        <h1 className="text-center">Add Todo</h1>
        <form id="add-form">
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
          <AddButton changeState={this.changeState} data={{title: this.state.title, description: this.state.description, due_date: this.state.due_date}}></AddButton>
          <Link to='/home'><button className="btn btn-danger ml-2">Cancel</button></Link>
        </form>
      </div>
    )
  }
}

export default AddPage