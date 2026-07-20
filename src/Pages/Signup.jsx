import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    username: '',
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

  const userExists = users.find(
    (user) => user.email === formData.email
  )

  if (userExists) {
    alert('User already exists')
    return
  }

  users.push(formData)

  localStorage.setItem(
    'users',
    JSON.stringify(users)
  )

  login(formData)

  navigate('/home')
}

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Create Account✨</h1>
        <p>Start writing your notes today</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
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

        <button type="submit">Signup</button>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup