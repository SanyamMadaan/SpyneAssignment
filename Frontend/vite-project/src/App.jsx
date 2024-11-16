import { useState } from "react"
import SignUp from "./Components/SignUp"
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import AddCar from "./Components/AddCar"
import ProductDetail from "./Components/ProductDetail"
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/addcar" element={<AddCar/>}></Route>
        <Route path="/productdetail/:id" element={<ProductDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
