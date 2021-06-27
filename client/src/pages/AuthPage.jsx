import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp, useMessage } from '../hooks/'
import urlSvg from "../assets/img/url.svg";

import svgPassword from "../assets/img/padlock.svg"
import svgEmail from "../assets/img/at.svg"
function AuthPage() {
  const auth = React.useContext(AuthContext)

  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()

  const [from, setFrom] = React.useState({
    email: "", password: ""
  })

  React.useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = event => {
    setFrom({ ...from, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...from })
      message(data.message)
    } catch (error) {

    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...from })
      auth.login(data.token, data.userId)
    } catch (error) {

    }
  }

  const pressEnter = async (event) => {
    try {
      if (event.key === 'Enter') {
        const data = await request('/api/auth/login', 'POST', { ...from })
        auth.login(data.token, data.userId)
        console.log(data);
      }
    } catch (e) {

    }
  }

  return (
    <div className="auth-page">
      <img src={urlSvg} className="url-icon" alt="url" />
      <h2 className="logo-link">Short links</h2>

      <div className="auth-container">

        <h1>Введите свой данные или зарегистрируйтесь</h1>
        <div className="card-content">

          <div className="input-field">
            <img src={svgEmail} alt="email" className='email-icon' />
            <input
              onChange={changeHandler}
              placeholder="Введите email"
              id="email"
              type="text"
              name="email"
              value={from.email}
            />
            <label htmlFor="email"></label>
          </div>

          <div className="input-field">
            <img src={svgPassword} alt="password" />
            <input
              name="password"
              placeholder="Введите пароль"
              id="password"
              type="password"
              value={from.password}
              onChange={changeHandler}
              onKeyPress={pressEnter}
            />
            <label htmlFor="password"></label>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn"
            disabled={loading}
            onClick={loginHandler}

          >Войти</button>
          <button
            className="btn"
            disabled={loading}
            onClick={registerHandler}
          >Регестрация</button>
        </div>
      </div>

    </div>
  )
}

export default AuthPage
