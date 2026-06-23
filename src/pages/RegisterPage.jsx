import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import RegisterInput from '../components/RegisterInput'
import { asyncRegisterUser } from '../states/users/action'

function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ email, name, password }))
      navigate('/login')
    } catch (error) {
      // Error is handled in the thunk.
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <span className="brand-mark">F</span>
          <h1>Buat Akun</h1>
          <p>Mulai bergabung dalam diskusi komunitas.</p>
        </div>

        <RegisterInput register={onRegister} />

        <p className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
