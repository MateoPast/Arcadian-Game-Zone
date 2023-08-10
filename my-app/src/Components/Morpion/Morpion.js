import { useState, useEffect, useRef } from 'react';
import oggyImg from '../../assets/images/Games/Morpion/oggy.png'
import cockroachesImg from '../../assets/images/Games/Morpion/cockroaches.png'
import Modal from '../Modal/Modal';
import axios from 'axios';
import React from 'react';
import './Morpion.scss';
import ModalScore from '../ModalScore/ModalScore';
const oggy = <img className="image-oggy_morpion" src={oggyImg} alt="Oggy a gagné!" />;
const cockroaches = <img className="image-cockroaches_morpion" src={cockroachesImg} alt="Les cafards ont gagné!" />;

export default function Morpion() {
  const [ gameScores, setGameScores] = useState([])
  const [gridMemory, setGridMemory] = useState(Array(9).fill(null));
  const [isPlayerXnext, setIsPlayerXnext] = useState(true);
  const [backColor, setBackColor] = useState(Array(9).fill('#2e80b3'));
  let scoreX  = useRef(0);
  let scoreComputer = useRef(0);

  const sendScore =  async (score) => {
    try {
      console.log('je suis dans sendScore');
      console.log('score', score);
      if (localStorage.getItem('access_token')) {
        const token = localStorage.getItem('access_token');
        const response = await axios.post('/API/scores/2', {score: score}, {
          headers: {
            'Authorization': token
          }
        });
        console.log('responsePost: ', response.data);
      }
    } catch (error) {
      console.log('error in sendscore: ', error)
    }
    
  }
  const getGameScore = async () => {
  try {
    const response2 = await axios.get('/API/scores/2')
    console.log('responseGet: ', response2.data);
    //setHighscores(reponse2);
    const data = response2.data
    setGameScores(data)
  } catch (error) {
    console.log('error in sendscore2: ', error)
  }
  }

  //Modal
  const [open, setOpen] = useState(false)
  const toggleModal = () => {
    setOpen(!open);
  };
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function getIaNextIndex() { 
    
    // donne-moi un index différent de ce qui est déjà occupé dans la gridmemory(cad si index déjà cliqué trouve-moi un autre)
    let index = getRandomInt(0, 8);
   console.log('hkjhk')
    while (gridMemory[index] !== null) {
      // Every verifie si chaque element de gridmemory est différent de null, si oui,  break
      if (gridMemory.every(element => element !== null)) {break;}
      console.log('craziIa');
      index = getRandomInt(0, 8);
    }
    return index; //retourne ce que tu m'as trouvé comme index
  };

  useEffect(() => {
    if (isPlayerXnext === false && winningLines(gridMemory) === null ) {
      setTimeout(() => {
        const indexIa = getIaNextIndex();
        const gridMemoryCopy = gridMemory.slice();
        gridMemoryCopy[indexIa] = cockroaches;
        setGridMemory(gridMemoryCopy);
        setIsPlayerXnext(!isPlayerXnext);
      }, 200);
    }
  }, [isPlayerXnext]);


  function handleClick(i) {
    if (winningLines(gridMemory) !== null || gridMemory[i] !== null) {
      return; // si winningLines est different de null cad retourne X ou 0,ou si un elmt de gridmemory est different de null cad contient déjà X ou O,  quitte (on ne peut donc plus cliquer)
    }
    const gridMemoryCopy = gridMemory.slice();
    if (isPlayerXnext === true) {
      gridMemoryCopy[i] = oggy ;
    }
    setGridMemory(gridMemoryCopy); //met à jour le tableau 
    setIsPlayerXnext(!isPlayerXnext); //Le contraire de l'état d'avant: isPlayerXnext devient false s'il était à true. Le useState devient false.
  }

  function winningLines(arrayData) {
      const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // si le premier element de Array est different de null (cad on a déjà cliqué)
      if (arrayData[a] !== null && 
        // et si le premier element de Array est egal au deuxieme elt de Array
        arrayData[a] === arrayData[b] && 
        // et si le premier elmt de Array est egal au troisieme element de Array
        arrayData[a] === arrayData[c]) {
          backColor[a]= '#F33418';
          backColor[b]= '#F33418';
          backColor[c]= '#F33418';
          return arrayData[a];
      }
    }
    return null;
  }
  
    const winner = winningLines(gridMemory);
    console.log (winner);
    let status;
  
    if (winner !== null) {
      status = `${winner?.props?.alt}`;
      if (winner === oggy) {scoreX.current = scoreX.current + 1;
        sendScore(scoreX.current);
        //setTimeout(() => {Reset()}, 3000)
      }
      if (winner === cockroaches) {scoreComputer.current = scoreComputer.current + 1;}
    } 
    else if (gridMemory.every(Boolean)) {
      status = 'Match nul !';
    }
    else {
      status = `${isPlayerXnext ? `C'est à Oggy` : `C'est aux cafards`} de jouer.`;
    }
  
    
  
  function Reset() {
    setGridMemory(Array(9).fill(null));
    setIsPlayerXnext(true);
    setBackColor(Array(9).fill('#2e80b3'));
  }

  function Grid({value, onSquareClick, gridBackColor }) {
    return (
      <button className="square" onClick={onSquareClick} style={{'backgroundColor': gridBackColor }}>
      {value}
    </button>
    );
  }

  return (
    <div className="morpion_container">
    <section className='morpion_main_section'>
      <h1 className='morpion_game_title'> Morpion </h1>
      <p className='morpion_game_rule'> Aide Oggy à se débarasser des cafards qui ont élu domicile chez lui. <br></br> Pour le faire, aligne trois Oggy horizontalement, verticalement ou en diagonale.</p>
      <div className='game'>
      <div className='div_scores'>
        <div className="scores"> Oggy - {scoreX.current} </div>   
        <div className='scores'> Les cafards - {scoreComputer.current} </div>
      </div>
      <div className="status">{status}</div> 
        <div className='board'>
          <div className="grid_row">
            <Grid value={gridMemory[0]} onSquareClick={() => {handleClick(0)}} gridBackColor={backColor[0]} />
            <Grid value={gridMemory[1]} onSquareClick={() => {handleClick(1)}} gridBackColor={backColor[1]}/>
            <Grid value={gridMemory[2]} onSquareClick={() => {handleClick(2)}} gridBackColor={backColor[2]}/>
          </div>
          <div className="grid_row">
            <Grid value={gridMemory[3]} onSquareClick={() => handleClick(3)} gridBackColor={backColor[3]}/>
            <Grid value={gridMemory[4]} onSquareClick={() => handleClick(4)} gridBackColor={backColor[4]}/>
            <Grid value={gridMemory[5]} onSquareClick={() => handleClick(5)} gridBackColor={backColor[5]}/>
          </div>
          <div className="grid_row">
            <Grid value={gridMemory[6]} onSquareClick={() => handleClick(6)} gridBackColor={backColor[6]}/>
            <Grid value={gridMemory[7]} onSquareClick={() => handleClick(7)} gridBackColor={backColor[7]}/>
            <Grid value={gridMemory[8]} onSquareClick={() => handleClick(8)} gridBackColor={backColor[8]}/>
          </div>
          
        </div>
          <ModalScore
          openScoreModal= {open}
          toggleScoreModal={toggleModal}
          gameScores={gameScores}
          playerScore={scoreX.current}
			    >
            
            <button className='morpion_scores_button' onClick ={toggleModal}> Fermer </button>
          </ModalScore>
        <div className='morpion_two_buttons'>
          <button className='reset' onClick ={() => Reset()}> Recommencer </button>
          <button className='morpion_scores_button' onClick ={() =>{getGameScore(); toggleModal(); Reset()}}> Scores </button>
          </div>
      </div>
    </section>
    </div>
  );
}


