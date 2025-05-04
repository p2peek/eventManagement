import React from "react"
import { Outlet } from "react-router-dom"
import Footer from "./Components/Footer.jsx"
import Header from "./Components/Header"

function App() {
  

  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default App
