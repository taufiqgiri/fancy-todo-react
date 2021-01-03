import '../App.css'
import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

class NavbarLogin extends Component {
  render() {
    return (
      <div id="navbar-loginpage">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to='/'>Todo App</Link>
        </nav>
    </div>
    )
  }
}

export default NavbarLogin