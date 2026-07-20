import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import CreateNote from './Pages/CreateNote'
import ProtectedRoute from './Context/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route 
        path="/home" 
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/create" 
        element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        } 
      />

    </Routes>
  )
}

export default App