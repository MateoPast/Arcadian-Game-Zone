import './FormInfosUser.scss'
import { memo } from 'react';
//import classnames from 'classnames';
//import {useState} from 'react';
import axios from 'axios';
import avatars from './avatarsIcons';

function FormInfosUser({toggleModal, infosUser, setInfosUser}) {

      const sendNewInfos =  async (e) => {
      e.preventDefault();
      console.log('call sendNewInfos');
      console.log('je suis dans sendNewInfos', {infosUser});
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.patch(`/API/player/`, {avatar_url:infosUser.avatar_url, user_name: infosUser.user_name, mail: infosUser.mail, password: infosUser.password}, {
          headers: {
            'Authorization': token
          }
        });
        console.log('response: ', response);
      } catch (error) {
        console.log('error: ', error)
      }
        
    }
    return (
        <form action="" method="post" className="userInfos-form" onSubmit={sendNewInfos}>
        <h1 className="formUserInfos-title">Changer tes infos</h1>
        <div className="avatarsAndTitle_container">
        <h2 className="avatars_title">Changer d'avatar</h2>
        <div className="avatars_container">
          {avatars.map((avatar) => (
              <button
              type="button"
              name= "avatar_url"
              value={infosUser.avatar_url}
              key={avatar.id}
              className="avatarInfosUser_button"
              onClick={
              (e)=> setInfosUser(
              prevState => ({
                ...prevState,
                avatar_url: avatar.src
                }))}
              >
                <img
                
                 className="avatarUser" 
                 src={avatar.src} alt="" />
              </button>
          ))}    
        </div>
         
       </div>
        <div className="input_container">
          <label className="userInfos-label">Nouveau Pseudo
          <input 
          id="userName_input" 
          name="user_name" 
          type="text" 
          className="userName_input input"
          value={infosUser.user_name} 
          onChange={
            (e)=> setInfosUser(
            prevState => ({
              ...prevState,
              user_name: e.target.value
              }))}/>
          </label>
        </div>

        <div className="input_container">
          <label className="userInfos-label">Nouvel Email
          <input 
          id="email_input" 
          name="email" 
          type="text" 
          className="mail_input input" 
          value={infosUser.mail} 
          onChange={
            (e)=> setInfosUser(
            prevState => ({
              ...prevState,
              mail: e.target.value
              }))}/>
          </label>
        </div> 

        <div className="input_container">
          <label className="userInfos-label">Ancien Mot de passe
          <input
          required="required"
          id="password_input" 
          name="password" 
          type="password" 
          className="password_input input" 
          value={infosUser.password} 
          onChange={
            (e)=> setInfosUser(
            prevState => ({
              ...prevState,
              password: e.target.value
              }))}/>
          </label>
        </div>

        <div className="input_container">
          <label className="userInfos-label">Nouveau Mot de passe
          <input 
          id="newPassword_input" 
          name="newPassword" 
          type="password" 
          className="newPassword_input input" 
          value={infosUser.password2} 
          onChange={
            (e)=> setInfosUser(
            prevState => ({
              ...prevState,
              password2: e.target.value
              }))}/>
          </label>
        </div>

        <div className="input_container">
          <label className="userInfos-label">Confirmation du Mot de passe  
          <input 
          id="confirmationPassword_input" 
          name="confirmationPassword" 
          type="password" 
          className="password_input input" 
          value={infosUser.password2} 
          onChange={
            (e)=> setInfosUser(
            prevState => ({
              ...prevState,
              password2: e.target.value
              }))}/>
          </label>
        </div>
        <div className="buttons_container">
          <button type="submit" className="submitUserInfoForm-button" onClick={toggleModal}>Enregister</button>
          <button type="button" className="closeModal-button" onClick={toggleModal}>Fermer</button>
        </div>
        </form>
  )
}
  
  export default memo(FormInfosUser);