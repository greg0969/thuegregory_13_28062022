import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import Header from "./components/Header";
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import store from './utils/store'
import '../src/styles/style.css';
import Erreur from './pages/Erreur';
import { logIn, userInfo } from './features/userSlice';

const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Erreur />} />
          </Routes>
          <Footer />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
);