import React from 'react'
import { Route, BrowserRouter, Routes} from 'react-router-dom'
import AdminLogin from './Home/LoginPage'
import Dashboard from './Home/Dashboard'

const App = () => {
  return (
    <BrowserRouter>
         <Routes>
          <Route path='/' element={<AdminLogin/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
         </Routes>
    </BrowserRouter>
    
  )
}

export default App