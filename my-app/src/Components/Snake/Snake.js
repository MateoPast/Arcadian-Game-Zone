import React, { useEffect, useRef, useState } from "react"
import "./Snake.scss"
import AppleLogo from "../../assets/images/applePixels.png"
import Snokia from "../../assets/images/snokia-blue.png"
import useInterval from "./useInterval"
import Modal from '../Modal/Modal'
import ModalScore from '../ModalScore/ModalScore'
import axios from 'axios';

const canvasX = 1000
const canvasY = 1000
const initialSnake = [ [ 4, 10 ], [ 4, 10 ] ]
const initialApple = [ 14, 10 ]
const scale = 50
const timeDelay = 100


function Snake() {


	const canvasRef = useRef(null);
	const [ gameScores, setGameScores ] = useState([]);
	const [ textModal, setTextModal ] = useState("");
	const [ snake, setSnake ] = useState(initialSnake);
	const [ apple, setApple ] = useState(initialApple);
	const [ direction, setDirection ] = useState([ 0, -1 ]);
	const [ delay, setDelay ] = useState(null);
	const [ gameOver, setGameOver ] = useState(false)
	const [ score, setScore ] = useState(0)
	const [open, setOpen] = useState(false)
	const [openScoreModal, setOpenScoreModal] = useState(false)
    const toggleModal = () => {
      setOpen(!open);
    };
	const toggleScoreModal = () => {
		setOpenScoreModal(!openScoreModal);
	  };

	useInterval(() => runGame(), delay)

	useEffect(
		() => {
			let fruit = document.getElementById("fruit");
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					ctx.fillStyle = "#011C49"
					snake.forEach(([ x, y ]) => ctx.fillRect(x, y, 1, 1))
					ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
				}
			}
		},
		[ snake, apple ]
	)

	useEffect(
		() => {
			if(gameOver){
				if(localStorage.getItem('access_token')){
					postGameScores()
				} else {
					getGameScores()
				}
			toggleScoreModal()
			setGameOver(false)
			}
		}, [gameOver]
	)

	// function handleSetScore() {
	// 	if (score >(localStorage.getItem("snakeScore"))) {
	// 		localStorage.setItem("snakeScore", JSON.stringify(score))
	// 	}
	// }

	const postGameScores = async () => {
		try { 
			 const token = localStorage.getItem('access_token');
			 const response = await axios.post(`/API/scores/3`, {score: score}, {
				headers: {
				  'Authorization': token
				}
			  });
			 if(response.status === 200) {
				getGameScores()
			 }
			 //const access_token = data.access_token;
			
			 //console.log(access_token)
 
			 /*if (response.status === 200) {
			 console.log('je suis success',"Success")
			 localStorage.setItem('access_token', access_token)
			 } else {
				 // Afficher un message d'erreur
				 console.log('je suis erreur', data.message);
			 }  */
		 } catch (error) {
			 console.log('error: ', error);  
		 }
	}

	const getGameScores = async () => {
		try { 
			// const token = localStorage.getItem('access_token');
			 const response = await axios.get(`/API/scores/3`);
			 console.log('response: ', response);
			 const data = response.data;
			 //const access_token = data.access_token;
			 console.log('data', data)
			 setGameScores(data);
			 //console.log(access_token)
 
			 /*if (response.status === 200) {
			 console.log('je suis success',"Success")
			 localStorage.setItem('access_token', access_token)
			 } else {
				 // Afficher un message d'erreur
				 console.log('je suis erreur', data.message);
			 }  */     
		 } catch (error) {
			 console.log('error: ', error);  
		 }
	}

	function play() {
		setSnake(initialSnake)
		setApple(initialApple)
		setDirection([ 1, 0 ])
		setDelay(timeDelay)
		setScore(0)
		setGameOver(false)
	}

	function checkCollision (head) {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale))
		if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			return true
		}
		return false
	}

	function runGame() {
		const newSnake = [ ...snake ]
		const newSnakeHead = [ newSnake[0][0] + direction[0], newSnake[0][1] + direction[1] ]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
			// handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
	}

	function changeDirection(e) {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
		}
		switch (e.target.value) {
			case "left":
				setDirection([ -1, 0 ])
				
				break
			case "up":
				setDirection([ 0, -1 ])
				
				break
			case "right":
				setDirection([ 1, 0 ])
				
				break
			case "down":
				setDirection([ 0, 1 ])
				
				break
		}
	}

	return (
		<div className="snake" onKeyDown={(e) => changeDirection(e)}>
			<img id="fruit" src={AppleLogo} alt="fruit" width="30" />
			<div className="game-container-snokia">
				<div className="background-image-snokia">
					{/* <img src={Snokia} alt="fruit" width="4000" className="snokia" /> */}
					<canvas className="playAreaSnokia" ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
					<button onClick={play} className="playButtonSnokia">
						Play
					</button>
				</div>
				<div className="scoreBoxSnokia">
					<h2 className="score">Score: {score}</h2>
				</div>
				<button className="rules-button" onClick={() => {toggleModal()}}>Comment jouer</button>
				<div className='mobile-direction-snokia'>
					<div className="first-row">
						<button value="up" onClick={(e)=> {changeDirection(e)}} >▲</button>
					</div>
					<div className="second-row">
						<button value="left" onClick={(e)=> {changeDirection(e)}} >◀︎</button>
						<button value="down" onClick={(e)=> {changeDirection(e)}} >▼</button>
						<button value="right" onClick={(e)=> {changeDirection(e)}} >▶︎</button>					
					</div>					
				</div>


			</div>
			<ModalScore
			openScoreModal= {openScoreModal}
			toggleScoreModal={toggleScoreModal}
			gameScores={gameScores}
			playerScore={score}
			>
				<button className='rejouer' onClick={() => {toggleScoreModal()}}> Rejouer </button>
			</ModalScore>
			<Modal
			openModal = {open}
			toggleModal = {toggleModal}
     		>
				<h1 className="modal-title">SNOKIA</h1>
				<div>Comment jouer ?</div>
				<p className="center">Appuyer sur PLAY</p>
				<p className="center">Appuyez sur les flèches du clavier pour faire déplacer le serpent sur l'écran ou les flèches si vous êtes sur mobile !</p>
				<p className="center">Manger le plus de pommes possible pour faire grandir le serpent et gagner des points !</p>
      		</Modal>
		</div>
		
	)
}

export default Snake;