import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import './App.css';

import Home from './components/Home'
import Login from './components/Login';
import TopFew from './components/TopFew';
import Preference from './components/Preference';
import RecipePage from './components/RecipePage';
import AskPref from './components/AskPref'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/preference" element={<Preference/>} />
        <Route path="/topfew" element={<TopFew/>} />
        <Route path="/recipe" element={<RecipePage/>} />
        <Route path="/ratesample" element={<AskPref />} />
      </Routes>
    </Router>
  );
}

export default App;
