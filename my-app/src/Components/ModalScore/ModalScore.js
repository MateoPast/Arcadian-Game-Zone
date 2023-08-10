import './ModalScore.scss'
import { memo } from 'react';
import classnames from 'classnames';


function ModalScore({ openScoreModal, gameScores, playerScore, children}) {
 

      return (
    <div className={classnames('modal', {openScoreModal})}>
        <div className="modalScore-overlay"></div>
        <div className="modalScore-content">
            <h1>{gameScores[0]?.game?.name}</h1>
            <div className='playerScore'> Ton score: {playerScore} </div>  
            <table className="scores_table">
                    <tbody>
                        <tr>
                                <th className="column_title">SCORE</th>
                                <th className="column_title">PSEUDO</th>
                            </tr>
                            { gameScores?.map((score, i) => (
                                <tr className="allScores" key={i}>
                                <td className="column_content">{score.score}</td>
                                <td className="column_content">{score.player.user_name}</td>
                            </tr>
                            ))}
                    </tbody>               
                </table>
            {children}
        </div>
        
    </div>
  )
}
  
  export default memo(ModalScore);