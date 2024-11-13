import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errormsg, setErrormsg] = useState('')
  const {history} = props
  const submitForm = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        setErrormsg(data.error_msg)
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    history.replace('/')
  }
  const onChangeUsername = event => setUsername(event.target.value)
  const onChangePassword = event => setPassword(event.target.value)

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <div className="label-container">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={onChangeUsername}
          />
        </div>
        <div className="label-container">
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>{errormsg}</p>
    </div>
  )
}

export default Login
