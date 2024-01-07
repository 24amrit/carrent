import './App.css'
import { Route, Routes } from 'react-router-dom'
import IndexPage from './pages/indexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
// import AccountPage from './pages/ProfilePage'
import ProfilePage from './pages/ProfilePage'
import CarsPage from './pages/CarsPage'
import CarsFormPage from './pages/CarsFormPage'
import CarPage from './pages/CarPage'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage/>} />
          <Route path="/account/cars" element={<CarsPage/>} />
          <Route path="/account/cars/new" element={<CarsFormPage/>} />
          <Route path="/account/cars/:id" element={<CarsFormPage/>} />
          <Route path="/cars/:id" element={<CarPage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
    
  )
}

export default App
