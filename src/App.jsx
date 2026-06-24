import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import UploadItem from './pages/UploadItem/UploadItem.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Profile from './pages/Profile/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/sell"
        element={
          <ProtectedRoute>
            <UploadItem />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
