import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    login({ email, password })
  }

  return (
    <form className="auth-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          placeholder="email@example.com"
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Masukkan password"
          className="form-input"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Masuk
      </button>
    </form>
  )
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired
}

export default LoginInput
