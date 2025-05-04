// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import EventsPage from './pages/EventPage.jsx'
import AdminDashboard from './pages/Admindashboard.jsx'
import CoordinatorDashboard from './pages/CoordinatorDashboard.jsx'
import StudentDashboard from './pages/StudentDashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<LandingPage/>}/>
      <Route path='events' element={<EventsPage/>}/>
      <Route path='admin-dashboard' element={<AdminDashboard/>}/>
      <Route path='coordinator-dashboard' element={<CoordinatorDashboard/>}/>
      <Route path='student-dashboard' element={<StudentDashboard/>}/>
      <Route path='login' element={<LoginPage/>}/>
      <Route path='register' element={<RegisterPage/>}/>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
