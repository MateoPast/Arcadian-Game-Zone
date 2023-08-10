import React from "react";
import "../Nav/Nav.scss";
import {useState} from "react";
import logo from '../../assets/images/Header/logoHeader.png';
import { Link, NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';


function Nav({ user_id, logout }) {

    const [showLinks, setShowLinks] = useState(false)
    const handleShowLinks = () => {
        setShowLinks(!showLinks);
    }

    const show_profile = user_id != null;

    const { pathname } = useLocation();
    //console.log(pathname);
    if (pathname === '/404') return null;
    return (
        <div className="header_logo">
            <header className="header-game">
                <img src={logo} className="header-app" alt="logo application" />
            </header>

            <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`}>

                <ul className={classnames('navbar_links', {show_profile})}>
                
                    <li><NavLink to="/" className="navbar_link" >Accueil</NavLink></li>
                    <li><NavLink to="/a-propos" className="navbar_link">A propos</NavLink></li>
                    <li><NavLink to="/highscores" className="navbar_link">Highscores</NavLink></li>
                    <li><NavLink to="/profil" className="navbar_profile navbar_link">Profil</NavLink></li>
                    <li><NavLink to="/connection" className="navbar_login navbar_link">Se connecter</NavLink></li>
                    <li><NavLink to="/signup" className="navbar_signup navbar_link">S'inscrire</NavLink></li>
                    <li><Link to="/connection" className="navbar_signout navbar_link" onClick={logout}>Se déconnecter</Link></li>

                </ul>
                

                <button className="navbar_burger" onClick={handleShowLinks}>
                    <span className="burger-bar"></span>
                </button>
            </nav>
        </div>
    )
}

export default Nav;




