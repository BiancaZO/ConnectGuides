import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from "./Layout"
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';


// Sets axios default values
axios.defaults.baseURL = "http://localhost:4000"; // or 127.0.0.1:4000 if Network -> headers -> cookies displays an exclamation mark
axios.defaults.withCredentials = true;

//import AccountPage from "./pages/AccountPage"

import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import AccountPage from './pages/AccountPage';

function App() {


  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App