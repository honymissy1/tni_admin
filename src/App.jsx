import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login'
import { useContext } from 'react';
import {Admin} from './context/admin'
function App() {
 const {admin} = useContext(Admin);

 console.log(admin);
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={admin ? (<Home />) : (<Login />)} />
      <Route path="/login" element={admin ?(<Home />):(<Login />)} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
