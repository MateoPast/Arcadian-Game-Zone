import { useState,useEffect } from "react";
import axios from 'axios';
import ModalEndGame from '../../ModalEndGame/Modal';
import Timer from './Timer/Timer'
import './Memory.scss';
import score_calc from '../../../utils/ScoreCalc';
import Modal from "../../Modal/Modal";
import Card from "./Card/Card"
import cards from "./cards"

function Memory() {
  const [randomCards, setRandomCards] = useState([]);
  const [won, setWon] = useState(false);
  const [gameOver, setGameOver] = useState (false);
  const [lives, setlives] =useState(7);
  const [cardsFlipped, setCardsFlipped] = useState([]);
  const [cardsWon, setCardsWon] = useState([]);
  const [timer, setTimer] = useState(null);
  const [timer_seconds, setTimerSeconds] = useState(0);
  const [highScores, setHighScores] = useState([]);
  const [score, setScore] = useState(0);

  const score_calculator = new score_calc();
  score_calculator.max_lives_count = 7;

  const sendScore =  async (newScore) => {
  if (localStorage.getItem('access_token')) {
    try {
      console.log('je suis dans sendScore');
      console.log('score', score);
      //setScore(score);
      //if (localStorage.getItem('access_token')) {
        const token = localStorage.getItem('access_token');
        const responsePost = await axios.post(`/API/scores/4`, {score: newScore}, {
          headers: {
            'Authorization': token
          }
        });
        console.log('responsePost: ', responsePost);
      //}
    
    } catch (error) {
      console.log('error: ', error)
    }
   }
  }

  const getGameScores = async() => {
    try {
      const responseGet = await axios.get(`/API/scores/4`)
      console.log('responseGet: ', responseGet);
      const data = responseGet.data;
      setHighScores([
        ...data
      ]
        );
    } catch (error) {
      console.log('error: ', error)
    }
  }
    
    

  useEffect(() => {
    setRandomCards(
    cards.sort((a, b) => 0.5 - Math.random())
    );
  
  }, [])

  //Modal de fin de jeu et de règles du jeu
  const [open, setOpen] = useState(false)
	const [openEndGameModal, setOpenEndGameModal] = useState(false)
    const toggleModal = () => {
      setOpen(!open);
    };
	const toggleEndGameModal = () => {
		setOpenEndGameModal(!openEndGameModal);
  };


    function checkIfWin () {
      if (cardsWon.length + 2 >= randomCards.length) {
      
        setWon(!won);
        //calcul du score
        const newScore = score_calculator.score(timer_seconds, lives);
        setScore(newScore);
        //Appel API post
        sendScore(newScore);
        //Appel API get
        getGameScores();
        toggleEndGameModal();
        //alert('gagné!');
      } else {
      
      if (lives === 0) {
        //stopper timer
        setGameOver(!gameOver);
        // Appel API get
        getGameScores();
        toggleEndGameModal();
        //alert('perdu!');
      }
    }};

  function handleClick (card_index) {
    const nextCardsFlipped = [card_index];
    if (cardsFlipped.length === 2) {
      if (randomCards[cardsFlipped[0]].name === randomCards[cardsFlipped[1]].name){
        setCardsWon([
          ...cardsWon,
          cardsFlipped[0],
          cardsFlipped[1],
        ]);
        console.log(cardsWon)
      
      } else {
        setlives(lives - 1);
      
      }
    } else if (cardsFlipped.length < 2) {
      nextCardsFlipped.push(...cardsFlipped);
    }
    setCardsFlipped(nextCardsFlipped);
    checkIfWin()
  }

  function startNewGame () {
    setTimerSeconds(0);
    setCardsFlipped([]);
    setWon(false);
    setGameOver(false);
    setlives(7);
    setCardsWon([]); 
    setRandomCards(
      cards.sort((a, b) => 0.5 - Math.random())
      );
  }
  
  return (
        <div className="memory">
        <header className="memory-header">
        <h1 className="title_memory1">Memory &lt;</h1>
        <h2 className="title_memory2">& future</h2>
        </header>
        <main className="memory-main">
              <div className="livesRules_container">
                <button className="rules_button" onClick={toggleModal}>Règles du jeu</button>
                <div className="lives">Lives: {lives}</div>
              </div>
              <div className="cards_container_memory">
              {randomCards.map((card, i) => (
                <Card
                  key={i}
                  {...card}
                  index = {i}
                  handleClick = {handleClick}
                  active = {cardsFlipped.includes(i) || cardsWon.includes(i)}
                />
                
                ))}
              </div>
              <div className="right-side_container">
                  <Timer
                  gameOver={ gameOver }
                  won= { won }
                  timer = { timer }
                  setTimer = { setTimer }
                  timer_seconds = { timer_seconds }
                  setTimerSeconds = { setTimerSeconds }
                ></Timer>
                <button className="startNeGame_button" onClick={startNewGame}>Back & start &lt;</button>
              </div>
        </main>
        <ModalEndGame
        openModal= {openEndGameModal}
        toggleEndGameModal={toggleEndGameModal}
        >
				{ won ? ( <div className="endGameModal_container">
        <div className="memory-header">
        <h1 className="title_memory1">Memory &lt;</h1>
        <h2 className="title_memory2">& future</h2>
        </div>
            <div className='playerScore'>
            <h2 className="won-lost_title_memory">Gagné!</h2>
            <h3 className="yourscore_title">Ton score: {score}</h3> 
            </div>
            <h3 className="scores_table_title">Highscores</h3>
            <div className="scores_table_container">
            <table className="scores_table">
                    <tbody>
                        <tr>
                                <th className="column_title">SCORE</th>
                                <th className="column_title">PSEUDO</th>
                            </tr>
                            { highScores.map((score, i) => (
                                <tr className="allScores" key={i}>
                                <td className="column_content">{score.score}</td>
                                <td className="column_content">{score.player.user_name}</td>
                            </tr>
                            ))}
                    </tbody>               
                </table>
                </div>
                <button className="startNeGame_button" onClick={() => {toggleEndGameModal(); startNewGame()}}>Relancer une partie</button>
                </div>
        ) : (<div className="endGameModal_container">
        <div className="memory-header">
          <h1 className="title_memory1">Memory &lt;</h1>
          <h2 className="title_memory2">& future</h2>
          </div>
          <h2 className="won-lost_title_memory">Perdu!</h2>
          <h3 className="scores_table_title">Highscores</h3>
          <div className="scores_table_container">
            <table className="scores_table">
                    <tbody>
                        <tr>
                                <th className="column_title">SCORE</th>
                                <th className="column_title">PSEUDO</th>
                            </tr>
                            { highScores.map((score, i) => (
                                <tr className="allScores" key={i}>
                                <td className="column_content">{score.score}</td>
                                <td className="column_content">{score.player.user_name}</td>
                            </tr>
                            ))}
                    </tbody>               
                    
                </table>
                </div>
                <button className="startNeGame_button" onClick={() => {toggleEndGameModal(); startNewGame()}}>Relancer une partie</button></div>)}
			</ModalEndGame>
        <Modal
          openModal = {open}
          toggleModal= {toggleModal}
        >        
          <p className="rules">Doc et Marty ont besoin de ton aide pour démarrer la DeLorean, cliques sur les cartes pour les retourner, et les aider à reconstituer toutes les paires nécessairent pour lancer le convecteur temporel.</p>
          <button className="rules_button" onClick={toggleModal}>Fermer</button>
        </Modal>
      </div>
  );
}

export default Memory;