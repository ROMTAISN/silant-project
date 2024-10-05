import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import SearchCar from './components/SearchCar';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import CarDetail from './components/CarDetail';
import Complaints from './components/Complaints';
import ComplaintsDetail from './components/ComplaintsDetail';
import TO from './components/TO';
import TODetail from './components/TODetail';
import Cars from './components/Cars';
import CarCreate from './components/CarCreate';
import TOCreate from './components/TOCreate';
import ComplaintCreate from './components/ComplaintCreate';

const App = () => {
  
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

  const handleAuthChange = (isLoggedIn) => {
    if (isLoggedIn) {
      setAuthToken(localStorage.getItem('token'));
    } else {
      setAuthToken(null);
    }
  };

  return (
    <div className='App'>
      <Router>
        <Header onAuthChange={handleAuthChange} />
        <Routes>
          <Route path="/cars" element={authToken ? <Cars authToken={authToken} /> : <Navigate to='/' />} />
          <Route exact path="/" element={authToken ? <Navigate to="/cars" /> : <SearchCar />} />
          <Route path="/cars/:id/" element={authToken ? <CarDetail authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/add-car/" element={authToken ? <CarCreate authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/to/" element={authToken ? <TO authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/to/:id" element={authToken ? <TODetail authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/add-to/" element={authToken ? <TOCreate authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/complaints/" element={authToken ? <Complaints authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/complaints/:id" element={authToken ? <ComplaintsDetail authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="/add-complaint/" element={authToken ? <ComplaintCreate authToken={authToken} /> : <Navigate to='/' />} />
          <Route path="*" element={<Cars authToken={authToken} />} />
        </Routes>
        <Footer />
    </Router>
    </div>
  );
};

export default App;

/*import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClientPage1 from './components/ClientPage1';
import Footer from "./components/Footer";
import Main from "./components/Main";
import './App.css';
import Header from './components/Header';


function App() {
    
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/cars" /> : <Login onLogin={hadleLogin} />} />
            <Route path="/cars" element={isAuthenticated ? <ClientPage /> : <Navigate to='/login' />} />
            <Route exact path="/" element={isAuthenticated ? <Navigate to="/cars" /> : <Login onLogin={hadleLogin} />} />
          </Routes>
          <button onClick={() => isAuthenticated ? handleLogout() : <Link to='/login' />}>
            {isAuthenticated ? 'Выйти' : 'Войти в аккаунт'}
          </button>
        </div>
      </BrowserRouter>
      
        <Route path='/' element={<SearchCar1 />} />
        <Route path='/cars' element={<Main authToken={authToken} />} />


        <Route path="/cars" element={authToken ? <Main authToken={authToken} /> : <Navigate to='/' />} />
        <Route exact path="/" element={authToken ? <Navigate to="/cars" /> : <SearchCar1 />} />
    );
};


export default App;*/
