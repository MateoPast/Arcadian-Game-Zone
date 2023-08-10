import './Sudoku.scss';
import { useState, useEffect, memo } from 'react';
import axios from 'axios';
import Board from './Board/Board';
import ControlsDigits from './ControlsDigits/ControlsDigits';
import Timer from './Timer/Timer';
import Lives from './Lives/Lives';
import score_calc from '../../../utils/ScoreCalc';
import ModalEndGame from '../../ModalEndGame/Modal';
import {imagesSudoku} from './imagesSudoku';


function Home() {
    // On liste tous les états possibles de jeu
    const playing_states = {
        loading: 1,
        playing: 2,
        won: 3,
        lost: 4
    };

    const max_lives_count = 6;
    
    const [images, setImages] = useState([]);

    const [values, setValues] = useState([]);
    const [solution, setSolution] = useState([]);
    const [selected_cell, setSelectedCell] = useState({
        column: 0,
        row: 0
    });
    
    const [playing_state, setPlayingState] = useState(playing_states.loading);
    const [timer, setTimer] = useState(null);
    const [timer_seconds, setTimerSeconds] = useState(0);
    const [lives, setLives] = useState(max_lives_count);
    const [score, setScore] = useState(-1);
    const [highscores, setHighscores] = useState([]);
    
    const score_calculator = new score_calc();
    score_calculator.max_lives_count = max_lives_count;

    const [openEndGameModal, setOpenEndGameModal] = useState(false);
    const toggleEndGameModal = () => {
        setOpenEndGameModal(!openEndGameModal);
    };


    const startNewGame = () => {
        setPlayingState(playing_states.loading);

        try {
            getData();
        } catch (error) {
            console.log('error: ', error);
        }
    }

    const getData = async () => {
        const response = await axios.get('https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution}}}');
        if (response.status === 200 && response.data?.newboard?.grids?.length === 1) {
            const newValues = response.data.newboard.grids[0].value;
            const newSolution = response.data.newboard.grids[0].solution;

            // si une ligne est complètement vide, on rajoute une donnée au hazard :)
            newValues.forEach((row, i) => {
                if (row.every(cell => cell === 0)) {
                    const rng_index = Math.floor(Math.random() * 9);
                    newValues[i][rng_index] = newSolution[i][rng_index];
                }
            });

            setValues(newValues);
            setSolution(newSolution);
            
            // mélange les images
            // (échange chaque élément avec un autre élément aléatoire du tableau)
            const shuffled_images = imagesSudoku.slice(0);
            for (let i = shuffled_images.length - 1; i > 0; --i) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled_images[i], shuffled_images[j]] = [shuffled_images[j], shuffled_images[i]];
            }
            setImages(shuffled_images.slice(0, 10));
        } else {
            throw new Error('the sudoku API did not yield the expected result');
        }
    };

    const getImage = digit => {
        if ( digit > 0 && images[digit] ) {
            return <img src={images[digit].url} alt={digit} draggable="false" />;
        }
    };

    const HandleDigitInput = digit => {
        if (// si la case est vide (= 0) ...
            values[selected_cell.row][selected_cell.column] === 0) {
            if (//... et que le nombre sur lequel on clique est conforme à la solution ...
                digit === solution[selected_cell.row][selected_cell.column]
            ) { // ... alors on met à jour la grille à jouer(values).
                const newValues = values.map((row, i) => {
                    if (selected_cell.row === i) {
                        return row.map((cell, j) => {
                            if (selected_cell.column === j) {
                                return digit;
                            } else {
                                return cell;
                            }
                        });
                    } else {
                        return row;
                    }
                });
                setValues(newValues);
            } else {
                setLives(lives => lives - 1);
            }
        }
    };

    const getHighscores = () => {
        axios.get('http://localhost:5000/API/scores/5')
        .then(res => {
            if (Array.isArray(res.data))
                setHighscores(res.data);
            else
                console.error('API error: can\'t get scores')
        }).catch(error => {
            console.error('couldn\'t get score');
        });
    };

    useEffect(() => {
        startNewGame();
    }, []);

    useEffect (() => {
        switch (playing_state) {
            case playing_states.won:
                const newScore = score_calculator.score(timer_seconds, lives);
                setScore(newScore);

                const token = localStorage.getItem('access_token');
                if (token) {
                    axios.post('http://localhost:5000/API/scores/5', {score: newScore}, {
                        headers: {
                            'Authorization': token
                        }
                    }).then(getHighscores).catch(error => {
                        console.error('couldn\'t post score');
                    });
                } else {
                    getHighscores();
                }

            case playing_states.lost:
                setOpenEndGameModal(true);
                
            break;
            default:
                setOpenEndGameModal(false);
        }
    }, [playing_state]);

    useEffect(() => {
        if (lives <= 0) {
            setPlayingState(playing_states.lost);
        }
    }, [lives]);

    

    useEffect(() => {
        
        if (values.length > 0) {
            if (playing_state === playing_states.loading) {
                setPlayingState(playing_states.playing);
            }

            if (
                values.every(
                    (row, i) => row.every(
                        (cell, j) => cell === solution[i][j]
                    )
                )
            ) {  // if the puzzle is solved:
    
                setPlayingState(playing_states.won);
            }
        }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    return (
        <div className="sudoku_container game">
            <h1 className="title_Sudoku">Sudoku</h1>
            <p className="rules_Sudoku">L'esprit frappeur du château a pris un malin plaisir à le mettre sens dessus dessous. Les professeurs sollicitent ton aide afin de tout remettre en place avant la rentrée des classes qui aura lieu… demain ! PS: deux objets identiques ne peuvent figurer sur une même ligne, colonne ou grille 3*3.</p>
            
            <div className="sudoku_elements_container">
                {(() => {
                    if (playing_state !== playing_states.loading) return (
                        <ControlsDigits
                            board = {values}
                            getImage = { getImage }
                            HandleDigitInput = { HandleDigitInput }
                        />
                    )
                })()}
                <Board
                    playing_states = { playing_states }
                    playing_state = { playing_state }
                    getImage = { getImage }
                    values = { values }
                    selected_cell = { selected_cell }
                    setSelectedCell = { setSelectedCell }
                />
                {(() => {
                    if (playing_state !== playing_states.loading) return (
                        <div className="controls_game">
                            <button id="grid_reset"></button>
                            <button id="digit_erase"></button>
                            <Timer
                                playing_states = { playing_states }
                                playing_state = { playing_state }
                                timer = { timer }
                                setTimer = { setTimer }
                                timer_seconds = { timer_seconds }
                                setTimerSeconds = { setTimerSeconds }
                            />
                            <Lives
                                lives = { lives }
                                setLives = { setLives }
                                playing_state = { playing_state }
                                playing_states = { playing_states }
                                max_lives_count = { max_lives_count }
                            />
                        </div>
                    )
                })()}
            </div>
            <ModalEndGame
              openModal = {openEndGameModal}
              toggleEndGameModal= {toggleEndGameModal}
            >
                <div className="endGameModal_container">
                    { playing_state === playing_states.won ? (
                        <div className='playerScore'>
                            <h1>Gagné !</h1>
                            <div>Ton score: {score}</div> 
                        </div>
                    ) : (
                        <h1>Perdu...</h1>
                    )}

                    <h2>Highscores</h2>

                    { highscores.length === 0
                    ? <p>Pas de scores pour l'instant</p>
                    : (
                        <table>
                            <tbody>
                                <tr>
                                    <th>score</th>
                                    <th>pseudo</th>
                                </tr>
                                {highscores.map((score, i) => (
                                    <tr key={i}>
                                        <td>{score.score}</td>
                                        <td>{score.player.user_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    <button onClick={() => {setOpenEndGameModal(false); startNewGame()}}>Relancer une partie !</button>
                </div>
            </ModalEndGame>
        </div>
    );
}

export default memo(Home);