import './Infos.scss'
import { memo } from 'react';

function Infos( {infosUser}) {
    
   
    return (
        <div className="infos_container">
        <img className="avatarUser" src={ infosUser.avatar_url } alt="" /> 
        <div className="infosText_container" >
           <p className="userName infosUser">Pseudo: { infosUser.user_name }</p>
           <p className="mail infosUser">Email: { infosUser.mail }</p>
        </div>
        </div>
    );
  }
  
  export default memo(Infos);

