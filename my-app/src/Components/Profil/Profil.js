import './Profil.scss';

import Infos from './Infos/Infos';
import Scores from './Scores/Scores'
import Button from './Button/Button';
import Modal from '../Modal/Modal';
import FormInfosUser from './FormInfosUser/FormInfosUser'
//import dataScores from '../../Data/scores'

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { memo } from 'react';


function Profil() {

  const [open, setOpen] = useState(false)
  const toggleModal = () => {
    setOpen(!open);
  };
  
    const [scores, setScores] = useState([]);
  const [infosUser, setInfosUser] = useState({
    user_name: "",
    mail: "",
    password: "",
    avatar_url: "",
  });


  useEffect(() => {
    const getData = async () => {
      let urls = [
        //recupérer infos utilisateur
        `/API/player`,
        //récupéré les scores du joeur
        `/API/scores/player`,
      ];
      
      try { 
        const token = localStorage.getItem('access_token');
        
        const response = await axios.all(urls.map((url) => axios.get(
          url,
          {
            headers: {
              'Authorization': token
            }
          }
        )));
        console.log('response: ', response);
        if (response.every(r => r.status === 200)) {
          const newScores= response[1].data;
          setScores(p => ({...p, ...newScores}));
          setInfosUser(response[0].data);
        console.log('scores', response[1].data);
        console.log('infos', response[1].data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          console.log('error: on est logout !');
        } else {
          console.log('error: ', error);
        }
      }
      
    };
    
    getData();
  }, []);
  
  console.log('je suis juste après le useEffect: ', scores);
  
  return (
    <div className="profil">
     <h1 className="title_profil">Profil <span className="userName_title">{infosUser.user_name}</span></h1>
      <Infos
     infosUser ={ infosUser }
      ></Infos>
      <Modal
      openModal = {open}
      toggleModal = {toggleModal}
      >
        <FormInfosUser
        toggleModal = {toggleModal}
          setInfosUser = {setInfosUser}
          infosUser = {infosUser}
        />
      </Modal> 
      <Button 
      toggleModal = { toggleModal }
      ></Button>
      <Scores
      scores = { scores }
      ></Scores>
     
    </div>
  );
}

export default memo(Profil);
