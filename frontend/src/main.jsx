import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import LandingPage from './pages/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import EventsPage from './pages/EventPage.jsx';
import AdminDashboard from './pages/Admindashboard.jsx';
import CoordinatorDashboard from './pages/CoordinatorDashboard.jsx';
import StudentDashboard from './pages/StudentDashboard.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path='events' element={<EventsPage />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='register' element={<RegisterPage />} />
      <Route path='unauthorized' element={<UnauthorizedPage />} />

      {/* Admin Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path='admin-dashboard' element={<AdminDashboard />} />
      </Route>

      {/* Coordinator Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin','coordinator']} />}>
        <Route path='coordinator-dashboard' element={<CoordinatorDashboard />} />
      </Route>

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['admin','coordinator','student']} />}>
        <Route path='student-dashboard' element={<StudentDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);















// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom';
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


// import LandingPage from './pages/LandingPage.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import RegisterPage from './pages/RegisterPage.jsx'
// import EventsPage from './pages/EventPage.jsx'
// import AdminDashboard from './pages/Admindashboard.jsx'
// import CoordinatorDashboard from './pages/CoordinatorDashboard.jsx'
// import StudentDashboard from './pages/StudentDashboard.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path='' element={<LandingPage/>}/>
//       <Route path='events' element={<EventsPage/>}/>
//       <Route path='admin-dashboard' element={<AdminDashboard/>}/>
//       <Route path='coordinator-dashboard' element={<CoordinatorDashboard/>}/>
//       <Route path='student-dashboard' element={<StudentDashboard/>}/>
//       <Route path='login' element={<LoginPage/>}/>
//       <Route path='register' element={<RegisterPage/>}/>
//     </Route>
//   )
// )


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// )
