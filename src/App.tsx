import { useState } from 'react'
import NavBar from './component/NavBar'
import SplitPage from './component/SplitPage'

import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './page/Index'
import SignIn from './page/SignIn'
import SignUp from './page/SignUp';


function App() {
  return (
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;