import '../App.css'
import React, {Component} from 'react'
import NavbarMain from '../components/NavbarMain'
import axios from 'axios'
import TodoCard from '../components/TodoCard'
import ErrorPage from '../pages/ErrorPage'

function MainPage() {
  const authenticated = localStorage.getItem('access_token')
  return (
    <div>
      { authenticated ? <ShowMainPage></ShowMainPage> : <ErrorPage></ErrorPage> }
    </div>
  )
}

class ShowMainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.fetchTodos = this.fetchTodos.bind(this)
  }

  fetchTodos () {
    axios.get('http://localhost:3000/todos', {
      headers: {
        access_token: localStorage.getItem('access_token')
      }
    })
      .then(response => {
        this.setState({
          todos: response.data
        }, (err, res) => {
          if (err) {
            console.log(err)
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  componentDidMount() {
    this.fetchTodos()
  }

  render() {
    return (
      <div>
        <NavbarMain></NavbarMain>
        <div className="main-page">
          <br/><br/>
          <div className="todo-list">
              <h1 className="text-center">List To Do</h1>
              <br/>
              <div className="container">
                <div className="row list-card">
                  {this.state.todos.map((todo) => (
                    <TodoCard key={todo.id} data={todo} fetchTodos={this.fetchTodos} ></TodoCard>
                  ))}
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MainPage