import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
  e.preventDefault()

  const users =
    JSON.parse(localStorage.getItem('users')) || []

  const foundUser = users.find(
    (user) =>
      user.email === formData.email &&
      user.password === formData.password
  )

  if (foundUser) {
    login(foundUser)

    navigate('/home')
  } else {
    alert('Invalid credentials')
  }
}

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Welcome Back 👋</h1>
        <p>Sign in to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        <p className='auth-link'>
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </div>
  )
}

export default Login