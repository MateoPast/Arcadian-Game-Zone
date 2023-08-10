import './Highscores.scss';
//import cup from '../../assets/images/Highscores/cup.png';
import crown from '../../assets/images/Highscores/title_crown.png';
import joystickbutton from '../../assets/images/Highscores/joystickButton.png';
import { memo } from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import background from '../../assets/images/box-background.svg'

function Highscores() {
    const [allScores, setAllScores] = useState([]);
    useEffect(() => {
        //TODO ajouter un jeu en bdd aux scores
        const getData = async () => {
            
            try { 
               // const token = localStorage.getItem('access_token');
                const response = await axios.get(`https://arcadian-game-zone.herokuapp.com/API/scores`);
                console.log('response: ', response);
                const data = response.data;
                //const access_token = data.access_token;
                console.log('data', data)
                setAllScores(data);
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
        };
                
            getData();
    }, []);

    // TODO table pour faire un tableau avec des colonnes et lignes
    return (
    
        <div className="highscores">
        {/*<div>
            //<img src={cup} alt="" />
        </div>*/}
            <div className="scores_container">
                <div className="title_highscores_container">
                    <img className="title_highscores_img" src={crown} alt="" />
                    <h1 className="title_highscores">HIGHSCORES</h1>
                    <img className="title_highscores_img" src={crown} alt="" />
                </div>
                    <table className="scores_table">
                        <tbody>
                            <tr>
                                    <th className="column_title">GAME</th>
                                    <th className="column_title">PSEUDO</th>
                                    <th className="column_title">SCORE</th>
                                </tr>
                                { allScores.map((score, i) => (
                                    <tr className="allScores" key={i}>
                                    <td className="column_content">{score.game.name}</td>
                                    <td className="column_content">{score.player.user_name}</td>
                                    <td className="column_content">{score.score}</td>
                                </tr>
                                ))}
                        </tbody>               
                        
                    </table>
                        <div className="backToHome_button_container">
                            <Link to="/" className="linkToHome_highscores">
                            Play
                            </Link>
                            <img className="backToHome_button_img" src={joystickbutton} alt="" />
                        </div>
                </div>
                
        </div>
    );
}

    
export default memo(Highscores); 