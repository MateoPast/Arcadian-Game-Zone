import './Page404.scss';
import video from './video404.mp4';
import logo from '../../assets/images/Header/logoHeader.png'
import { Link } from 'react-router-dom';

function Page404() { 
  return (
    <div className="page404_container">
      <video className="video-page404" src={video} type="video/mp4" autoPlay muted loop>
      </video> 
      <div className="text-page404_container">
        <img className="logo-page404" src={logo} alt="" />
        <h1 className="title-page404">Oups on dirait que tu t'es perdu(e)</h1>
        <Link className="linkToHome-page404" to='/'>Pour retourner à l'accueil c'est par ici!</Link>
      </div>
    </div>
  );
}

export default Page404;