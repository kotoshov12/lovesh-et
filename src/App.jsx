import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Shop from './pages/Shop/Shop.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import Support from './pages/Support/Support.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import UploadItem from './pages/UploadItem/UploadItem.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Messages from './pages/Messages/Messages.jsx'
import Conversation from './pages/Conversation/Conversation.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/support" element={<Support />} />
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
      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/messages/:id"
        element={
          <ProtectedRoute>
            <Conversation />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
