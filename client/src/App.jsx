import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from "./Layout"
import RegisterPage from './pages/RegisterPage';

//import AccountPage from "./pages/AccountPage"

import { Routes, Route } from 'react-router-dom'

function App() {
  return (   
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      
      </Route>
    </Routes>
  );
}

export default App