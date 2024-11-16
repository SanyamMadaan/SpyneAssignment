import { useState } from "react"
import SignUp from "./Components/SignUp"
import Login from './Components/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
