import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import ScrollToTop from './components/ScrollToTop/ScrollToTop.jsx'

// Route-level code splitting — each page is its own chunk, so the initial
// bundle stays small and pages load on demand.
const Home = lazy(() => import('./pages/Home/Home.jsx'))
const Shop = lazy(() => import('./pages/Shop/Shop.jsx'))
const Cart = lazy(() => import('./pages/Cart/Cart.jsx'))
const Checkout = lazy(() => import('./pages/Checkout/Checkout.jsx'))
const Support = lazy(() => import('./pages/Support/Support.jsx'))
const ProductDetail = lazy(() => import('./pages/ProductDetail/ProductDetail.jsx'))
const SellerProfile = lazy(() => import('./pages/SellerProfile/SellerProfile.jsx'))
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile.jsx'))
const UploadItem = lazy(() => import('./pages/UploadItem/UploadItem.jsx'))
const Login = lazy(() => import('./pages/Login/Login.jsx'))
const Register = lazy(() => import('./pages/Register/Register.jsx'))
const Profile = lazy(() => import('./pages/Profile/Profile.jsx'))
const Messages = lazy(() => import('./pages/Messages/Messages.jsx'))
const Conversation = lazy(() => import('./pages/Conversation/Conversation.jsx'))
const Notifications = lazy(() => import('./pages/Notifications/Notifications.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))

function App() {
  return (
    <Suspense fallback={<div className="route-loading">טוען…</div>}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/seller/:id" element={<SellerProfile />} />
        <Route path="/user/:id" element={<UserProfile />} />
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
          path="/sell/:id"
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
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
