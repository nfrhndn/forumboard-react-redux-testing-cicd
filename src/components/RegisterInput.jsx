import React from 'react'
import PropTypes from 'prop-types'
import useInput from '../hooks/useInput'

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('')
  const [email, onEmailChange] = useInput('')
  const [password, onPasswordChange] = useInput('')

  const onSubmitHandler = (event) => {
    event.preventDefault()
    register({ name, email, password })
  }

  return (
    <form className="auth-form" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="name">Nama</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onNameChange}
          placeholder="Nama lengkap"
          className="form-input"
          required
        />
      </div>

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
          placeholder="Minimal 6 karakter"
          className="form-input"
          required
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Daftar
      </button>
    </form>
  )
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired
}

export default RegisterInput
