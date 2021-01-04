import '../App.css'
import React, {Component} from 'react'
import {
  Link,
  useHistory
} from 'react-router-dom'
import { useAlert } from 'react-alert'

class NavbarMain extends Component {
  render() {
    return (
      <div id="navbar-mainpage">
          <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-main">
              <Link to='/home' className="navbar-brand">
                Todo App
              </Link>
              <div>
                <Link to='/add'>
                  <button type="button" className="btn btn-primary btn-navbar-main mr-2">Add Todo</button>
                </Link>
                <LogoutButton></LogoutButton>
              </div>
          </nav>
      </div>
    )
  }
}

function LogoutButton() {
  let history = useHistory()
  const alert = useAlert()

  function logout (e) {
    e.preventDefault()
    localStorage.clear()
    alert.show('Logout successfully!!')
    history.push('/')
  }
  return (
    <button type="button" className="btn btn-danger btn-navbar-main" onClick={logout}>
      Log Out
    </button>
  )
}

export default NavbarMain