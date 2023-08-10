import './Button.scss';
import { memo } from 'react';

function Button({toggleModal}) {
    return (
       <button type="button" className="changeInfosUser_button" onClick={toggleModal}>Modifier le profil</button>
    );
  }
  
  export default memo(Button); 

