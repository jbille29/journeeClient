import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ContactUs from './pages/ContactUs';
import Journals from './pages/Journals';
import Landing from './pages/Landing';
import NewEntry from './pages/NewEntry';
import UserProfile from './pages/UserProfile';
import Entries from './pages/Entries';
import EditEntry from './pages/EditEntry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/:userId' element={<UserProfile />} />
        <Route path='/:userId/journals' element={<Journals />} />
        <Route path='/:userId/:journalId/' element={<Entries />} />
        <Route path='/:userId/:journalId/new' element={<NewEntry />} />
        <Route path='/:userId/:journalId/:entryId' element={<EditEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
