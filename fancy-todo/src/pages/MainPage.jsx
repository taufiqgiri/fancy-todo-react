import '../App.css'
import React, {useEffect} from 'react'
import NavbarMain from '../components/NavbarMain'
import TodoCard from '../components/TodoCard'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {fetchAllTodos} from '../actions/todosAction'

function MainPage() {
  const authenticated = localStorage.getItem('access_token')
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllTodos())
  }, [dispatch])

  if (!authenticated) {
    return <Redirect to='/' />
  }

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
                {todos.map((todo) => (
                  <TodoCard key={todo.id} data={todo}></TodoCard>
                ))}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage