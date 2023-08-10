import './Scores.scss';
import { memo } from 'react';

function Scores({ scores }) {
    console.log('je suis dans score 2', scores);
    return (
        <div className="profil_scores_container">
            <div className="scores-titles_container">
                <h2 className="scores_title">Tes meilleurs scores</h2>
            </div>
            <div className="scores_container">
                { scores ? Object.values(scores).map((score, i) => (
                    <p className="scores" key={i}>{score.game.name} {score.score}</p>
                )) : undefined}
            </div>
            
    </div>
    );
}

export default memo(Scores);

