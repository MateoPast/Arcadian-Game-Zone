import {useState, useEffect} from 'react';
import axios from 'axios';
import './Lependu.scss';
import pendu0 from '../../assets/images/pendu0.png';
import pendu1 from '../../assets/images/pendu1.png';
import pendu2 from '../../assets/images/pendu2.png';
import pendu3 from '../../assets/images/pendu3.png';
import pendu4 from '../../assets/images/pendu4.png';
import pendu5 from '../../assets/images/pendu5.png';
import pendu6 from '../../assets/images/pendu6.png';
import pendutop from '../../assets/images/pendutop.png';
import zombie from '../../assets/images/zombiefull.png';
import Modal from "../../Components/Modal/Modal";
import ModalEndGame from '../../Components/ModalEndGame/Modal';
import zombieM from '../../assets/images/zombieModal1.png'

import {WORDS} from '../Lependu/RandomWord';
import Timer from '../Lependu/Timer';
import score_calc from '../../utils/ScoreCalc';


function Lependu() {

    const id = Math.floor(Math.random() * WORDS.length);

    const [word, setWord] = useState(WORDS[id].name);
    const [hintWord, setHintWord] = useState(WORDS[id].clue)
    const [guesses, setGuesses] = useState([]);
    const [lives, setLives] =useState(6);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [timer, setTimer] = useState(null);
    const [timer_seconds, setTimerSeconds] = useState(0);
    const [highScores, setHighScores] = useState([]);
    const [score, setScore] = useState(0);
  

const images =[pendu6,pendu5,pendu4,pendu3,pendu2, pendu1, pendu0]
const full = [zombie]
const zombieModal = [zombieM]


const score_calculator = new score_calc();
score_calculator.max_lives_count = 6;


const sendScore =  async (score) => {
  if (localStorage.getItem('access_token')) {
    try {
      console.log('je suis dans sendScore');
      console.log('score', score);
      //if (localStorage.getItem('access_token') && won) {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(`/API/scores/1`, {score: score}, {
          headers: {
            'Authorization': token
          }
        });
        console.log('responsePatch: ', response);
      
     
    } catch (error) {
      console.log('error: ', error)
    }
  }
    /*try {
      const response2 = await axios.get('http://localhost:5000/API/scores/1')
      console.log('responseGet: ', response2);
      //récupérer
      setHighScores([
        ...response2.data
      ])
    } catch (error) {
      console.log('error: ', error)
    }*/
  }

 /* function checkIfWin () {
    if(word.split('').every((letter) => guesses.includes(letter))) { 
    
      setWon(!won);
      //calcul du score
      const score = score_calculator.score(timer_seconds, lives);
      console.log(score)
      //Appel API patch/get
      sendScore(score);
 
      //alert('gagné!');
    } else {
    
    if (lives === 6) {
      //stopper timer
      setGameOver(gameOver);
      // Appel API get
      //alert('perdu!');
    }
  }};*/

  const getGameScores = async() => {
    try {
      const responseGet = await axios.get(`/API/scores/1`)
      console.log('responseGet: ', responseGet);
      const data = responseGet.data;
      setHighScores(
        data
        );
    } catch (error) {
      console.log('error: ', error)
    }
  }
    


const handleClick = (letter) => {
    setDisabledButtons([...disabledButtons, letter]);
    //checkIfWin ()
}


const [open, setOpen] = useState(false)
const [openEndGameModal, setOpenEndGameModal] = useState(false)
  const toggleModal = () => {
    setOpen(!open);
  };
const toggleEndGameModal = () => {
  setOpenEndGameModal(!openEndGameModal);
};




    const handleGuess = (guess) => {
        if(gameOver) return;
        if (guesses.includes(guess)) return; 
        if(word.includes(guess)) {
            setGuesses([...guesses, guess]);
         
        } else {
            setLives(lives - 1);
        }
        
    };
 
 

    useEffect(() => {
        if(lives < 1) {
            setGameOver(true)
            setWon(false);
            //appel API  post
            
            //Appel API get
            getGameScores();
          
        }
        if(word.split('').every((letter) => guesses.includes(letter))) {
            setGameOver(true);
            setWon(true);
            //calcul de score
            const score = score_calculator.score(timer_seconds, lives);
            console.log(score);
            setScore(score);
            //appel API  get
            sendScore(score);    
       
        }
        if(gameOver) {
            setGameOver(true)
            setWon(false)
         
         
        
        }else{
          return
    }
    
    }, 
    
    [lives, guesses, word, setGameOver, setWon]);


   


    const resetGame = () => {
        setWord(WORDS[id].name);
        setHintWord(WORDS[id].clue)
        setGuesses([])
        setLives(6);
        setGameOver(false);
        setWon(false);

        setDisabledButtons([]);
    }


 
    return (
      <div className='Hangman'>
      
         <div className='headGame'>
            <img src={pendutop} className='header-game' alt="Titre jeu" />
         </div>
         <div className="lives-time_container">
            <p className='incorrect'>Lives:<span className='counterLives'>{lives}</span> </p>
 
            <Timer
                    gameOver={ gameOver }
                    won= { won }
                    timer = { timer }
                    setTimer = { setTimer }
                    timer_seconds = { timer_seconds }
                    setTimerSeconds = { setTimerSeconds }
                  ></Timer>
            </div>


          {gameOver ? (
              <div className='sectionWinLOse'>
               
                  {won ? <span className='wonZombie'>Tu as gagné!</span> : <span className='loseZombie'>Perdu!</span>}
                  <div>  
                      <p className='answerZombie'><span className='answerWord'>Réponse :</span>  {word}</p>
                     
                           
                  </div>
                  <button className='resetHang' onClick={() => resetGame()}> Play Again </button>

   <button className='resetScore' onClick={() => {getGameScores();toggleEndGameModal()} }> Mon score </button>
              <div className='showimg'>
              <img className='imageZombie' src={full} alt="test"/>
              </div>
          
              


              </div>
         
          ) : (
  
              
              <div className='incorrectHang'>
                  
                  <button className='lawGame'onClick={toggleModal}>Les règles du jeu</button> 
         
                 
                
                  <img className='imagePendu' src={images[lives]} alt="test"/>
                  <div className ='guessPendu'>
                 
                      {word
                     
                          .split('')
                          .map((letter, i)=>(<p key={i} >{guesses.includes(letter) ? letter : '_'}</p>))}
                  </div>
                  <div className='showHint'>
  {
      hintWord
     
  }
                  </div>
                  <div className='alphabet'>
                
                      {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter, i) => (
                          <button className='hangman_button' key={letter} onClick={()=>{handleGuess(letter); handleClick(letter)}} disabled={disabledButtons.includes(letter)}>{letter}</button>
                     
                      ))}
                     
                  
  </div>
  
              </div>
          )}
 <Modal
          openModal = {open}
          toggleModal= {toggleModal}
        >        
          <p className="rulesHang"><span className='rulesText'>Te voilà plonger dans l'univers de <br></br>"The Walking Dead" ! </span>
          <br>
          </br>
          Ta mission, si tu l'acceptes ne sera pas de tuer, mais de sauver les zombies car l'un de nos développeur a peut-être trouvé un vaccin. Il nous en faudra donc un maximum de zombies pour ENFIN sauver l'humanité.
          <br>
          </br>
          Pour cela, trouve le mot caché à l'aide des indices que nous t'avons laissé et évite-leur la pendaison. </p>
          
          <div className='showimg'>

         <img className='imageZombie2' src={zombieModal} alt="test"/>
         </div>
          
          
          <button className="rula_button" onClick={toggleModal}>Fermer</button>
        </Modal>
        <ModalEndGame
        openModal= {openEndGameModal}
        toggleEndGameModal={toggleEndGameModal}
        >
                 <div className='modalHang'>
             
             <h1>Le pendu</h1>
         <div className='playerScore'> Ton score: {score} </div>
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
             <button className="rul_button" onClick={toggleEndGameModal}>Fermer</button>
             </div>
         <div className='showimg'>

         <img className='imageZombie' src={full} alt="test"/>
         </div>

     </ModalEndGame>

      </div>
      );
      
  };
  
  export default Lependu;

   