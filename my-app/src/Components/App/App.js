import './App.scss';
import Nav from '../Nav/Nav';
import Footer from "../Footer/Footer";
import { Routes, Route, Navigate } from 'react-router-dom';
import Confidentiality from '../Confidentiality/Confidentiality';
import Mentions from '../Mentions/Mentions';
import Highscores from '../Highscores/Highscores';
import Login from '../Connection/Connection.js';
import About from  '../About/About.js';
import Profil from '../Profil/Profil';
import Sudoku from '../Games/Sudoku/Sudoku';
import Home from '../Home/Games';
import Signup from '../Signup/Signup';
import Lependu from '../Lependu/Lependu';
import Snake from '../Snake/Snake'
import Memory from '../Games/Memory/Memory'
import Morpion from '../Morpion/Morpion';
import Page404 from '../Page404/Page404';

import { useState } from 'react';



function App() {
  const [user_id, setUserId] = useState(null);

  if (!user_id) {
    if (localStorage.getItem('user_id')) {
      setUserId(localStorage.getItem('user_id'));
      return;
    }
  }

  const login = (userId, access_token) => {
    setUserId(userId);
    localStorage.setItem('user_id', userId);
    localStorage.setItem('access_token', access_token);
  }

  const logout = () => {
    setUserId(null);
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
  }

  return (
    <div className="App">
      <Nav user_id={user_id} logout={logout} />

      <Routes>
        <Route path="/" element={(<Home />)} />
        <Route path="/confidentialité" element={(<Confidentiality />)} />
        <Route path="/mention-legales" element={(<Mentions />)} />

        <Route path="/a-propos" element={(<About />)} />

        <Route path="/highscores" element={(<Highscores />)} />
        <Route path="/profil" element={(<Profil />)} />
        
        <Route path="/signup" element={(<Signup login={login} />)} />
        <Route path="/connection" element={(<Login login={login} />)} />

        <Route path="/lependu" element={(<Lependu game_id="1" />)} />
        <Route path="/morpion" element={(<Morpion game_id="2" />)} />
        <Route path="/snake" element={(<Snake game_id="3" />)} />
        <Route path="/memory" element={(<Memory game_id="4" />)} />
        <Route path="/sudoku" element={(<Sudoku game_id="5" />)} />

        <Route path="*" element={ <Navigate to="/404" /> }/>
        <Route path="/404" element={ <Page404/> }/>
      </Routes>

      <Footer />

    </div>
  );
}

export default App;

