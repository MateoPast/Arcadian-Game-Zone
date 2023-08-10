import './Timer.scss';
import { useEffect } from 'react';


const Timer = function Timer({ playing_states, playing_state, timer, setTimer, timer_seconds, setTimerSeconds }) {

  useEffect(() => {
    switch (playing_state) {
        case playing_states.playing:
            if (timer > 0) {
                setTimerSeconds(0);
                setTimer(clearInterval(timer));
            }

            setTimer(setInterval(() => {
                setTimerSeconds(prev_time => prev_time + 1);
            }, 1000));

            break;

        default:
            setTimerSeconds(0);
            setTimer(clearInterval(timer));
    }
  }, [playing_state]);

  return (
    <div className="timer_container">
        <p>
            { timer_seconds }s
        </p>
    </div>
    
  );
};

export default Timer;