import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx'
import UploadItem from './pages/UploadItem/UploadItem.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/sell" element={<UploadItem />} />
    </Routes>
  )
}

export default App
