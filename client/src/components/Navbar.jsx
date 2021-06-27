import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'



function Navbar() {
  const history = useHistory()
  const auth = React.useContext(AuthContext)

  const logoutHandler = event => {
    let youSure = window.confirm("хотите выйти из аккаунта")
    if (youSure) {
      event.preventDefault()
      auth.logout()
      history.push('/')
    }
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <h2 className="logo-link"><NavLink to="/create">Short link</NavLink></h2>
        <ul className="menu">
          <li className='navigator'><NavLink activeClassName="active-menu" to="/create">создать</NavLink></li>
          <li className='navigator'><NavLink activeClassName="active-menu" to="/links">список ссылок</NavLink></li>
          <li className='navigator'><a href="/" className='exit' onClick={logoutHandler}>выйти</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
