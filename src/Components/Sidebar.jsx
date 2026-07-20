import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { useRef } from 'react'

function Sidebar({ profileImage, setProfileImage }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const fileInputRef = useRef()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        setProfileImage(reader.result)
        localStorage.setItem(`profileImage_${user.email}`, reader.result)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div>
        <div className="profile-section">
          <img
            src={profileImage || 'https://via.placeholder.com/120'}
            alt="profile"
            className="profile-image"
            onClick={() => fileInputRef.current.click()}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          <h2>{user?.username}</h2>
        </div>

        <button
          className="new-note-btn"
          onClick={() => navigate('/create')}
        >
          New Note
        </button>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Sidebar