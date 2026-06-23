import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginInput from '../components/LoginInput'
import { asyncSetAuthUser } from '../states/authUser/action'

function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
    navigate('/')
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-mark">F</span>
          <h1>Masuk ke ForumBoard</h1>
          <p>Gunakan akun Dicoding Forum API untuk melanjutkan.</p>
        </div>

        <LoginInput login={onLogin} />

        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
