import './Lives.scss';
import { useEffect } from 'react';


function Lives({ lives, setLives, max_lives_count, playing_state, playing_states }) {

  useEffect(() => {
    switch (playing_state) {
        case playing_states.playing:
            setLives(max_lives_count)
    }
  }, [playing_state]);

  return (
    <div className="lives_container">
        <p>
            { lives } chances restantes
        </p>
    </div>
  );
}

export default Lives;