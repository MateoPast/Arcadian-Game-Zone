import './Footer.scss';
import { NavLink, useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();
    //console.log(pathname);
    if (pathname === '/404') return null;
  return (
    <div className="footer">
        <div className="footer_content">
          <nav className="navbar_footer">
            <NavLink className="link_footer" to="/confidentialité">
              Politique de confidentialité
            </NavLink>
            <NavLink className="link_footer" to="/mention-legales">
              Conditions d'utilisation
            </NavLink>
            <p className="footer_allrights">Tous droits réservés - 2023</p>  
          </nav>
          
        </div>

    </div>
    
  );
}

export default Footer;
