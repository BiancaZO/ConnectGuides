import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from "./Layout"
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

// Sets axios default values
axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

import { Routes, Route } from 'react-router-dom'
import { UserContextProvider } from './UserContext';
import ProfilePage from './pages/ProfilePage';
import GuideServicePage from './pages/GuideServicePage';
import GuideServiceFormPage from './pages/GuideServiceFormPage';

import BookingsPage from './pages/BookingsPage';
import BookingPage from './pages/BookingPage';

import SingleGuideServicePage from './pages/SingleGuideServicePage';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/guideService" element={<GuideServicePage />} />
          <Route path="/account/guideService/new" element={<GuideServiceFormPage />} />
          <Route path="/account/guideService/:id" element={<GuideServiceFormPage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          <Route path='/account/bookings/:id' element={<BookingPage />} />
          <Route path="/singleGuideService/:id" element={<SingleGuideServicePage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App